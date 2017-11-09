import { Component, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'cc-lesson',
  styleUrl: 'cc-lesson.scss'
})
export class CCLesson {
  @Prop() config: string;
  @Element() lessonEl: HTMLElement;
  @State() currentSlideIndex: number = 0;

  totalSlides: number;

  componentWillLoad() {
    this.totalSlides = this.lessonEl.querySelectorAll('cc-slide').length;
  }

  getConfig() {
    const lessonData = (window as any)._lesson;
    return lessonData;
  }

  setCurrentSlideToVisible() {
    const allSlides = [].slice.call(this.lessonEl.querySelectorAll('cc-slide'));
    allSlides.forEach((slide, index) => {
      slide.style.display = (index === this.currentSlideIndex) ? 'block' : 'none';
    });
  }

  handlePreviousClick() {
    this.currentSlideIndex -= 1;
    this.currentSlideIndex = Math.max(0, this.currentSlideIndex);
  }

  handleNextClick() {
    this.currentSlideIndex += 1;
    this.currentSlideIndex = Math.min(this.totalSlides - 1, this.currentSlideIndex);
  }

  render() {
    const config = this.getConfig();
    if (!config) {
      this.lessonEl.innerHTML = '';
      return (
        <div>Whoops, something went wrong.</div>
      );
    }
    this.setCurrentSlideToVisible();
    return (
      <div>
        <h3 class="cc-lesson-header">{config.name}</h3>
        <slot />
      </div>
    );
  }
}
