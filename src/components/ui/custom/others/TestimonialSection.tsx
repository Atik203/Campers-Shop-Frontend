import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Rating } from "../customUI/Rating";
import TitleDescriptionBlock from "../customUI/TitleDescriptionBlock";

const reviews = [
  {
    content:
      "This tent is amazing! I took it on my camping trip and it withstood the weather perfectly.",
    name: "Alice Johnson",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    designation: "Camping Enthusiast",
    rating: 5,
  },
  {
    content:
      "Great quality backpacks. They are very comfortable and have lots of space.",
    name: "David Williams",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    designation: "Backpacker",
    rating: 5,
  },
  {
    content:
      "The outdoor clothing line is fantastic. It keeps me warm and dry in all conditions.",
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    designation: "Outdoor Adventurer",
    rating: 4,
  },
  {
    content: "Top-notch camping gear. Durable and reliable for all my trips.",
    name: "Michael Brown",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    designation: "Camping Guide",
    rating: 5,
  },
  {
    content:
      "The footwear collection is great. Comfortable and perfect for long hikes.",
    name: "Sophia Wilson",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    designation: "Hiker",
    rating: 4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-20 lg:px-4">
      <TitleDescriptionBlock
        title="What Our Customers Say"
        description="Don't just take our word for it. Here's what our customers have to say about their experience with our products and services."
      />
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-8 md:px-4 lg:px-0">
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="space-y-12 sm:space-y-16">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  <Rating
                    rating={review.rating}
                    showBadge={false}
                    variant="yellow"
                  />
                </div>
                <blockquote className="mt-4 text-base md:text-lg font-semibold leading-8 tracking-tight text-gray-900 sm:text-xl sm:leading-9">
                  <p>{`“${review.content}”`}</p>
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-4">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={review.image}
                    alt={review.name}
                  />
                  <div className="text-sm leading-6 text-center sm:text-left">
                    <div className="font-semibold text-gray-900">
                      {review.name}
                    </div>
                    <div className="mt-0.5 text-gray-600">
                      {review.designation}
                    </div>
                  </div>
                </figcaption>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
