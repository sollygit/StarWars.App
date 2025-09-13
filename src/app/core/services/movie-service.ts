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
      url: `${env.api.starwarsApiUrl}/api/movies/protected`,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
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
      url: `${env.api.starwarsApiUrl}/api/movies/secured`,
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

  getById = (id: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movies/${id}`,
      method: 'GET',
      headers: { 'content-type': 'application/json' }
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

  delete = (id: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movies/${id}`,
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
      url: `${env.api.starwarsApiUrl}/api/movies`,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
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

  update = (movie: MovieModel): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movies/${movie.id}`,
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
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

  generate = (): Observable<ApiResponseModel> => {
    let _body = {
      id: `TEST_${Math.random().toString(10).substring(3, 7)}`,
      title: `Generated Movie ${Math.random().toString(36).substring(2, 7)}`,
      year: '2025',
      poster: 'https://picsum.photos/id/666/640/480',
      price: 999.99,
      movieRatings: []
    };
    const config: RequestConfigModel = {
      url: `${env.api.starwarsApiUrl}/api/movies`,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: _body
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
