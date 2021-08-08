import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { AuthService} from '../auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user.model';
import jwtDecode from 'jwt-decode';

export interface AuthResponseData {
  username: string;
  token: string;
}

const handleAuthentication = (
  username, token: string
) => {
  const { exp } = jwtDecode(token) as {
    'exp': number;
  };
  const expirationDate = new Date(new Date().getTime() + exp * 1000);
  const user = new User(username, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess(
    {
      username,
      token,
      expirationDate,
      redirect: true
    });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'INVALID_EMAIL': {
      errorMessage = 'Email неверный!';
      break;
    }
    case 'EMAIL_EXISTS': {
      // errorMessage = 'The email address is already in use by another account.';
      errorMessage = 'Этот адрес используется другим аккаунтом.';
      break;
    }
    case 'EMAIL_NOT_FOUND': {
      // errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      errorMessage = 'Нет записи пользователя, соответствующей этому идентификатору. Возможно, пользователь был удален.';
      break;
    }
    case 'INVALID_PASSWORD': {
      // errorMessage = 'The password is invalid or the user does not have a password.';
      errorMessage = 'Неверный пароль.';
      break;
    }
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://localhost:5001/api/account/register',
        {
          username: signupAction.payload.username,
          password: signupAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          const { exp } = jwtDecode(resData.token) as {
            'exp': number;
          };
          console.log(exp);
          this.authService.setLogoutTimer(exp * 1000);
        }),
        map(resData => {
          return handleAuthentication(
            resData.username,
            resData.token
          );
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://localhost:5001/api/account/login',
        {
          username: authData.payload.username,
          password: authData.payload.password
        }
      ).pipe(
        tap(resData => {
          const { exp } = jwtDecode(resData.token) as {
            'exp': number;
          };
          this.authService.setLogoutTimer(exp * 1000);
        }),
        map(resData => {
          return handleAuthentication(
            resData.username,
            resData.token
          );
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  );
  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        username: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return  { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.username,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess( {
          username: loadedUser.username,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
        // this.user.next(loadedUser);
        // const expirationDuration =
        // new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
