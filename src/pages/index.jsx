export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center text-ternary">School Database</h1>
            <div className="text-center mt-8 space-x-4">
                <a href="/addSchool" className="text-white bg-secondary py-2 px-4 rounded hover:bg-ternary hover:shadow-[4px_4px_8px_0px_rgba(0,_0,_0,_0.35)]">
                    Add School
                </a>
                <a href="/showSchools" className="text-white bg-secondary py-2 px-4 rounded hover:bg-ternary hover:shadow-[4px_4px_8px_0px_rgba(0,_0,_0,_0.35)]">
                    Show Schools
                </a>
            </div>
        </div>
    );
}
