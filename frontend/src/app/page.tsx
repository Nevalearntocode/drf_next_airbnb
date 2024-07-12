import Categories from "./_components/categories/categories";
import PropertyList from "./_components/properties/property-list";

export default function Home() {
  return (
    <main className="container">
      <div className="flex flex-col items-center pb-6 pt-3">
        <Categories />
        <PropertyList route="all" />
      </div>
    </main>
  );
}
