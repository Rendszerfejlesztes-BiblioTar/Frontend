import { useNavigate } from "@solidjs/router";
import {
    createSignal,
    JSX,
    useContext
} from "solid-js";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";

export default (): JSX.Element => {

     const navigate = useNavigate();
    
        const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    
        const [email, setEmail] = createSignal('');
        const [password, setPassword] = createSignal('');
        const [password2, setPassword2] = createSignal('');
        const [error, setError] = createSignal('');
    
        const handleSubmit = (e: Event) => {
            e.preventDefault();
            if (!email() || !password() || !password2()) {
                setError('Please fill every field!');
                return;
            }

            if (password() != password2()) {
                setError("Passwords don't match!");
                return;
            }

            if (password().length < 8) {
                setError("Password must be at least 8 characters!");
                return;
            }
    
            app.authentication.register({Email: email(), Password: password()}).then((res => {                
                if (typeof res !== 'string') {
                    navigate('/login');
                } else {
                    setError(res);
                }
            }));
    
        };

    return <>
    <div class="container d-flex justify-content-center align-items-center " style={{height: '80vh'}}>
        <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
            <h2 class="text-center mb-4">Create account</h2>
            {error() && <div class="alert alert-danger">{error()}</div>}
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input
                        id="email"
                        type="email"
                        class="form-control"
                        value={email()}
                        onInput={(event) => setEmail(event.currentTarget.value)}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        class="form-control" 
                        value={password()}
                        onInput={(event) => setPassword(event.currentTarget.value)}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="password2" class="form-label">Password again</label>
                    <input
                        id="password2"
                        type="password"
                        class="form-control" 
                        value={password2()}
                        onInput={(event) => setPassword2(event.currentTarget.value)}
                        required
                    />
                </div>
                <a href="/login" class="d-block mb-3">Got an account?</a>
                <button type="submit" class="btn btn-primary w-100" style={{ background: '#402208', color: 'white', "border-color": '#402208'}}>Register</button>
            </form>
        </div>
    </div>
</>
}