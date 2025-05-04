import {
    injectable
} from "tsyringe";

@injectable()
export class HttpService {
    private serverURL!: string;

    constructor(server_URL: string) {
        this.serverURL = server_URL;
    }

    private getHeaders(): Headers {
        const headers = new Headers();

        const token: string | null = localStorage.getItem('accessToken');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }

    public Get(path: string): Promise<Response> {
        return fetch(
            this.serverURL + path,
            {
                'method': 'GET',
                'headers': this.getHeaders()
            }
        );
    }

    public Post(path: string, body?: any): Promise<Response> {
        return fetch(
            this.serverURL + path,
            {
                'method': 'POST',
                'headers': this.getHeaders(),
                'body': JSON.stringify(body ?? {}) ?? '{}'
            }
        );
    }

    public Patch(path: string, body?: any): Promise<Response> {
        return fetch(
            this.serverURL + path,
            {
                'method': 'PATCH',
                'headers': this.getHeaders(),
                'body': JSON.stringify(body ?? {}) ?? '{}'
            }
        );
    }

    public Put(path: string, body?: any): Promise<Response> {
        return fetch(
            this.serverURL + path,
            {
                'method': 'PUT',
                'headers': this.getHeaders(),
                'body': JSON.stringify(body ?? {}) ?? '{}'
            }
        );
    }

    public Delete(path: string): Promise<Response> {
        return fetch(
            this.serverURL + path,
            {
                'method': 'DELETE',
                'headers': this.getHeaders(),
            }
        );
    }
}