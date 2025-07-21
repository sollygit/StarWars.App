import { HeroBannerComponent } from "./hero-banner.component";
import { NAVIGATION_COMPONENTS } from "./navigation";
import { PageLayoutComponent } from "./page-layout.component";
import { PageLoaderComponent } from "./page-loader.component";

export const COMPONENTS = [
    ...NAVIGATION_COMPONENTS,
    HeroBannerComponent,
    PageLayoutComponent,
    PageLoaderComponent
];
