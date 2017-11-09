import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'cc-slide',
  styleUrl: 'cc-slide.scss'
})
export class CCSlide {
  render() {
    return (
      <div class="card">
        <slot />
      </div>
    );
  }
}
