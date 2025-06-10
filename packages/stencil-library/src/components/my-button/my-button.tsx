import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  /**
   * The text to display on the button
   */
  @Prop() text: string;

  render() {
    return <button>{this.text}</button>;
  }
}
