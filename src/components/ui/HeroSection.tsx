export default function HeroSection() {
  return (
    <div className="relative overflow-hidden mb-12">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Gear Up for Your Next Adventure
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Discover the best camping gear and accessories for your outdoor
              adventures. Whether you're heading to the mountains or the beach,
              our new collection has everything you need to stay comfortable and
              safe.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://adventureshop.mt/cdn/shop/files/LA_INDO_NEW6_TREK_e5e585b0-aaa2-4f9f-8744-0847cb7e597e.jpg?v=1718197658&width=600"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://adventureshop.mt/cdn/shop/files/SS23-Rossignol-Online-Shop-banner-SHOES.png?v=1682516045&width=600"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://adventureshop.mt/cdn/shop/files/2024_ClassicAir_Orange_High33-large.jpg?v=1713452170&width=600"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://adventureshop.mt/cdn/shop/files/1_BasileEtOscar_VillardDeLans_Rossignol_HD_LouisGarnier-15-3500x5247-8f7acbc3-f500-4068-8381-fdd7c9b5b195.png?v=1698678464&width=600"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://adventureshop.mt/cdn/shop/files/IMAGE_1_SKI.heic?crop=region&crop_height=3916&crop_left=0&crop_top=0&crop_width=2937&v=1709285859&width=925"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://contents.mediadecathlon.com/s1045801/k$f565435ab9f757520f7ff22b34494a77?format=auto&f=969x0"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://contents.mediadecathlon.com/s1030714/k$14e6d43dc72f03c7b6248c95b3cfe8e1/1800x0/1061pt553/1290xcr1106/default.jpg?format=auto"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block rounded-lg border border-transparent bg-primary px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
