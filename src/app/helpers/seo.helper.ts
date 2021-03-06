import { Injectable, Inject } from '@angular/core';
import { __platform_browser_private__ as _, DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SeoHelper {

    private dom: any;
    private document: any;
    private headElement: HTMLElement;
    private metaDescription: HTMLElement;
    private canonical: HTMLElement;
    private ogTitle: HTMLElement;
    private ogType: HTMLElement;
    private ogDescription: HTMLElement;
    private ogUrl: HTMLElement;
    private ogUpdated: HTMLElement;
    private twitterDescription: HTMLElement;
    private twitterTitle: HTMLElement;
    private articlePublished: HTMLElement;
    private articleModified: HTMLElement;
    private articleSection: HTMLElement;

    constructor(
        @Inject(DOCUMENT) document: any
    ) {
        this.dom = _.getDOM();
        this.document = document;
        this.headElement = this.document.head;

        this.metaDescription = this.getOrCreateElement('description', 'name');
        this.canonical = this.getOrCreateElement('rel', 'canonical', 'link');

        this.ogTitle = this.getOrCreateElement('og:title', 'property');
        this.ogType = this.getOrCreateElement('og:type', 'property');
        this.ogDescription = this.getOrCreateElement('og:description', 'property');
        this.ogUrl = this.getOrCreateElement('og:url', 'property');
        this.ogUpdated = this.getOrCreateElement('og:updated_time', 'property');

        this.twitterDescription = this.getOrCreateElement('twitter:description', 'name');
        this.twitterTitle = this.getOrCreateElement('twitter:title', 'name');

        this.articlePublished = this.getOrCreateElement('article:published_time', 'property');
        this.articleModified = this.getOrCreateElement('article:modified_time', 'property');
        this.articleSection = this.getOrCreateElement('article:section', 'property');
    }

    public setMeta(title: string = '', description: string = '', url: string = '', published: Date = new Date(), modified: Date = new Date(), section: string = '') {
        this.setTitle(title);
        this.setMetaDescription(description);
        this.setUrl(url);
        this.setPublished(published);
        this.setModified(modified);
        this.setSection(section);
    }

    private setTitle(title: string) {
        let fullTitle = `3sq.re - ${title}`;
        this.document.title = fullTitle;
        this.setElementAttribute(this.ogTitle, 'content', fullTitle);
        this.setElementAttribute(this.twitterTitle, 'content', fullTitle);
    }

    private setMetaDescription(description: string) {
        this.setElementAttribute(this.metaDescription, 'content', description);
        this.setElementAttribute(this.ogDescription, 'content', description);
        this.setElementAttribute(this.twitterDescription, 'content', description);
    }

    private setUrl(newUrl: string) {
        this.setElementAttribute(this.ogUrl, 'content', newUrl);
        this.setElementAttribute(this.canonical, 'href', newUrl);
    }

    private setPublished(newDate: Date) {
        this.setElementAttribute(this.articlePublished, 'content', newDate.toISOString());
    }

    private setModified(newDate: Date) {
        this.setElementAttribute(this.articleModified, 'content', newDate.toISOString());
        this.setElementAttribute(this.ogUpdated, 'content', newDate.toISOString());
    }

    private setSection(newSection: string) {
        this.setElementAttribute(this.articleSection, 'content', newSection);
    }

    private getOrCreateElement(name: string, attr: string, type: string = 'meta'): HTMLElement {
        let el: HTMLElement;
        el = this.dom.createElement(type);
        this.setElementAttribute(el, name, attr);
        this.dom.insertBefore(this.document.head.lastChild, el);

        return el;
    }

    private setElementAttribute(el: HTMLElement, name: string, attr: string) {
        return this.dom.setAttribute(el, name, attr);
    }
}
