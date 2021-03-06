import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Ng2DisqusModule } from 'ng2-disqus';
import { PageScrollConfig } from 'ng2-page-scroll';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { AppComponent } from './app/components/app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { BlogComponent } from './app/components/blog/blog.component';
import { PostComponent } from './app/components/post/post.component';
import { LostComponent } from './app/components/lost/lost.component';

import { HttpService } from './app/services/http.service';
import { CacheService } from './app/services/cache.service';
import { WordpressService } from './app/services/wordpress.service';
import { SeoHelper } from './app/helpers/seo.helper';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, HomeComponent, BlogComponent, PostComponent, LostComponent ],
  providers: [
      HttpService,
      CacheService,
      WordpressService,
      SeoHelper,
      HighlightJsService
  ],
  imports: [
    UniversalModule,
    Ng2PageScrollModule,
    Ng2DisqusModule,
    HighlightJsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog/:year/:month/:slug',
        component: PostComponent
      },
      {
        path: '**',
        component: LostComponent
      }
    ])
  ]
})
export class MainModule {
  constructor() {
    PageScrollConfig.defaultDuration = 500;
  }
}
