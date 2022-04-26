import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth"

export default function RegisterPage() {
  const auth = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setBusy(true);

    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setBusy(false);
      })
      .catch((error) => {
        setError(error.message);
        setBusy(false);
      });
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="rounded-lg shadow-lg border border-gray-200 p-6 w-full max-w-sm">
        <h2 className="mb-4 text-center text-xl font-thin">Welcome!</h2>

        {error ? (
          <div className="text-red-500 font-bold text-sm mb-4">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <input autoFocus disabled={busy} className="w-full border border-gray-200 px-3 py-2 rounded" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
          </div>

          <div>
            <input disabled={busy} className="w-full border border-gray-200 px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
          </div>

          <div className="flex justify-end">
            <button disabled={busy} type="submit" className="border border-blue-500 bg-blue-500 px-4 py-3 rounded font-bold text-xs text-white uppercase hover:border-blue-600 transition-all duration-200">Sign up</button>
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <Link to="/login" className="text-blue-500 text-sm font-bold">Sign in instead?</Link>
        </div>
      </div>
    </div>
  )
}
