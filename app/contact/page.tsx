import ContactForm from "@/components/ContactForm";

async function Page() {
return (
        <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-3xl text-white font-bold">Explore Pokemons</h2>
            <ContactForm />
        </main>
    );
}

export default Page;
