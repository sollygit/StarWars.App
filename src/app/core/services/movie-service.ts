import { inject, Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ApiResponseModel, RequestConfigModel, MovieModel } from '../models';
import { ExternalApiService } from './external-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private externalApiService = inject(ExternalApiService)
  private httpClient = inject(HttpClient)

  getPublicResource() {
    return this.httpClient.get<any[]>('assets/movies.json');
  }

  getProtectedResource = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movie/protected`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as MovieModel[]) : null,
          error,
        });
      })
    );
  };

  getAdminResource = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movie/secured`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as MovieModel[]) : null,
          error,
        });
      })
    );
  };

  delete = (id: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movie/${id}`,
      method: 'DELETE',
      headers: {},
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as MovieModel) : null,
          error,
        });
      })
    );
  }

  create = (movie: MovieModel): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movie`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: movie
    };
    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;
        return of({
          data: data ? (data as MovieModel) : null,
          error,
        });
      })
    );
  }

}
