import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private _emailUser: string = null;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  get emailUser() {
    return this._emailUser;
  }

  set emailUser(newEmail) {
    const nameUser: string = null;
    if (newEmail.indexOf('@')) {
      newEmail = newEmail.slice(
        0,
        newEmail.slice().indexOf('@')
        ) + newEmail.slice(
        newEmail.slice().indexOf('@') + 1,
        newEmail.length
        )
      ;
    }
    if (newEmail.indexOf('.')) {
      newEmail = newEmail.slice(
        0,
        newEmail.slice().indexOf('.')
        ) + newEmail.slice(
        newEmail.slice().indexOf('.') + 1,
        newEmail.length
        )
      ;
    }
    this._emailUser = newEmail;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8zLSLJPirtEa-YlV6k3-pCxuEh0EmAp0',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8zLSLJPirtEa-YlV6k3-pCxuEh0EmAp0',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this._emailUser = resData.email;
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }
    ));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.emailUser = userData.email;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this._emailUser = null;
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer.null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Возникла неизвестная ошибка!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}
