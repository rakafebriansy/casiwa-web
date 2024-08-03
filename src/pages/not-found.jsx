import SquareButton from "../components/Elements/SquareButton";
import Signature from "../components/Fragments/Signature";

const NotFoundPage = () => {
    return (
        <section className="min-h-screen flex items-center justify-center font-montserratRegular">
            <div class="max-w-[50rem] flex flex-col mx-auto size-full">
                <header class="mb-auto flex justify-center z-50 w-full py-4">
                    <Signature/>
                </header>
                <main id="content">
                    <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
                    <h1 class="block text-7xl font-montserratBold text-primary sm:text-9xl">404</h1>
                    <p class="mt-3 text-gray-600 dark:text-neutral-400">Oops, telah terjadi kesalahan.</p>
                    <p class="text-gray-600 dark:text-neutral-400">Mohon maaf, kami tidak dapat menemukan halaman anda.</p>
                    <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                        <SquareButton type="link" colorCode="bg-secondary" path='/' >Kembali ke beranda</SquareButton>
                    </div>
                    </div>
                </main>

                <footer class="mt-auto text-center py-5">
                    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <p class="text-sm text-gray-500 dark:text-neutral-500">© 2024. Casiwa. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </section>
    );
}

export default NotFoundPage;