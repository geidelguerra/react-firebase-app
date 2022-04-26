import { useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/auth"

export default function ForgotPasswordPage() {
  const auth = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setBusy(true);

    auth.sendPasswordResetEmail(email)
      .then(() => {
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
        <h2 className="mb-4 text-center text-xl font-thin">Reset password</h2>

        {error ? (
          <div className="text-red-500 font-bold text-sm mb-4">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <input autoFocus disabled={busy} className="w-full border border-gray-200 px-3 py-2 rounded" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
          </div>

          <div className="flex justify-end">
            <button disabled={busy} type="submit" className="border border-blue-500 bg-blue-500 px-4 py-3 rounded font-bold text-xs text-white uppercase hover:border-blue-600 transition-all duration-200">Reset password</button>
          </div>
        </form>
        <div className="flex justify-between mt-8">
          <Link to="/login" className="text-blue-500 text-sm font-bold">Sign in instead?</Link>
          <Link to="/register" className="text-blue-500 text-sm font-bold">Sign up instead?</Link>
        </div>
      </div>
    </div>
  )
}
