/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OLEkDALeNMW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-md text-center">
        <div className="text-9xl font-bold text-primary">404</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for could not be found. It might have been
          removed or the URL might be incorrect.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
