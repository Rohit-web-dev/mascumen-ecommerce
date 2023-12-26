import BannerSec from "@/components/home/BannerSec";
import ExploreProductSec from "@/components/home/ExploreProductSec";
import ProductCarouselSec from "@/components/home/ProductCarouselSec";
import SocialMediaSec from "@/components/home/SocialMediaSec";
import SubscribeSec from "@/components/home/SubscribeSec";

export default function Home() {
  return (
    <>
      {/* -- Banner --  */}
      <BannerSec />

      {/* -- Shaving Products --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">Shaving</h2></div>
      <ProductCarouselSec />

      {/* -- Cleanser Scrubs& Masks Products --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">Cleanser Scrubs& Masks</h2></div>
      <ProductCarouselSec />

      {/* -- Body Washes,Bars& Lotions Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Body Washes,Bars& Lotions</h2>
        <p class="section-para">Details to details is what makes mascumen different from the others.</p>
      </div>
      <ProductCarouselSec />

      {/* -- Hair Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Hair</h2>
        <p class="section-para">Shampoos,Conditioners& Styling Aids</p>
      </div>
      <ProductCarouselSec />

      {/* -- Hair Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Beards</h2>
        <p class="section-para">Beard,Balms& Oils</p>
      </div>
      <ProductCarouselSec />

      {/* -- Explore Products --  */}
      <ExploreProductSec />

      {/* -- Social Media --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Social Media</h2>
        <p class="section-para">Details to details is what makes Mascumen different from the others.</p>
      </div>
      <SocialMediaSec />

      {/* -- Subscribe --  */}
      <SubscribeSec />
    </>
  )
}
