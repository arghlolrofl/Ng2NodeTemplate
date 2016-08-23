import { Observable } from "rxjs";

export interface IRepositoryService<T> {
    getAll(): Observable<Array<T>>;
}
