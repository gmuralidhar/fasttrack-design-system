import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  /**
   * The text to display on the button (if no slot is used)
   */
  @Prop() text: string;

  /**
   * The type of the button
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * If true, the button is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The variant of the button (for styling)
   */
  @Prop() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /**
   * The size of the button
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Accessible label for the button
   */
  @Prop() ariaLabel?: string;

  /**
   * Emitted when the button is clicked
   */
  @Event() buttonClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  };

  render() {
    const classes = {
      [`btn`]: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
      [`btn--disabled`]: this.disabled,
    };

    return (
      <button
        class={classes}
        type={this.type}
        disabled={this.disabled}
        aria-label={this.ariaLabel}
        onClick={this.handleClick}
      >
        <slot>{this.text}</slot>
      </button>
    );
  }
}