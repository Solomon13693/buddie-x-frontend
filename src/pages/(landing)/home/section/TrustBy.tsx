const TrustBy = () => {

    const brands = [1, 2, 3, 4, 5, 6, 7]

    return (
        <div className="container flex flex-col items-center justify-center space-y-6">

            <h2 className="text-sm md:text-sm text-[#141B34] font-light text-center leading-7">
                Trusted by teams at over <span className="font-medium">1,000</span>{' '} 
                of the world’s leading organizations
            </h2>

            <div className="flex items-center gap-x-16 gap-y-4 flex-wrap justify-center">
                {brands.map((brand) => (
                    <div key={brand} className="md:w-20 w-14 h-10 flex items-center justify-center">
                        <img src={`/img/home/brand/${brand}.svg`} alt={`Brand ${brand}`} className="w-full h-full object-contain" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TrustBy