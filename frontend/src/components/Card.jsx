function Card({ icon, title, description }) {
  return (
    <div className="h-24 w-full block md:w-64 md:h-44 px-5 py-4 m-2 md:flex md:flex-col rounded-2xl bg-neutral-700 transition-colors hover:bg-neutral-600">
      <div className="flex flex-row items-center mb-2">
        <img className="mr-2 ml-2 w-8 h-8" src={icon} alt="Find" />
        <h1 className="font-bold text-lg md:text-xl md:my-5">{title}</h1>
      </div>
      <p className="font-light text-sm md:text-md">{description}</p>
    </div>
  );
}

export default Card;
