import PlaceCarousel from "@/components/place/Carousel";
import PlaceContent from "@/components/place/Content";

export default function Place() {
  return (
    <div className="w-full">
      <div className="relative w-full h-screen lg:h-[110vh]">
        <PlaceCarousel />
      </div>
      <div className="relative z-20">
        <PlaceContent />
      </div>
    </div>
  );
}