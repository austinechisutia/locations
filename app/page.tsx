import PhoneInputTable from "@/components/PhoneInputTable";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Contact Details
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Enter your phone number and country code to get started.
        </p>
      </div>

      <PhoneInputTable />

      <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Get Locations App. All rights reserved.
      </footer>
    </div>
  );
}
