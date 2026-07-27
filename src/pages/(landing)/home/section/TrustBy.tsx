const brands = ["1", "2", "3", "4", "5", "6", "7"]

const TrustBy = () => {

    return (
        <div className="container flex flex-col items-center justify-center space-y-6">

            <h2 className="text-sm md:text-sm text-[#141B34] font-light text-center leading-7">
                Mentors with  <span className="font-medium">experience </span>{' '}
                across leading organisations
            </h2>

            {
<div className="flex items-center gap-x-16 gap-y-4 flex-wrap justify-center">
    {brands.map((brand) => (
        <div key={brand} className="md:w-20 w-14 h-10 flex items-center justify-center">
            <img src={`/img/home/brand/${brand}.svg`} alt={`Brand ${brand}`} className="w-full h-full object-contain" />
        </div>
    ))}
</div>
}

            

        </div>
    )
}

export default TrustBy