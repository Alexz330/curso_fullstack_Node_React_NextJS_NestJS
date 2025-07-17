import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
    return (
        <>
        <Header />
        <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top bg-home home-xl">
            <div className="max-w-5xl mx-auto mt-10">
                <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                    <h1 className="text-6xl font-black">
                        Todas tus <span className="text-blue-500">redes sociales</span> en un enlace
                    </h1>
                    <p className="text-xl text-gray-600">
                        Únite  a más de 200mil developers compartiendo sus redes sociales, comparte tu perfil de TikTok, Instagram, X, GitHub y más.
                    </p>
                    <SearchForm />
                </div>
            </div>
        </main>
        </>
    );
}