import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="housing"
            src="https://images.unsplash.com/photo-1714498975277-ad0de33eceb4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="text-center">
              <SignIn
                path="/sign-in"
                className="text-4xl text-gray-900 font-bold mb-6"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Housing Society 🏠
            </h1>
            <p className="mt-2 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}
