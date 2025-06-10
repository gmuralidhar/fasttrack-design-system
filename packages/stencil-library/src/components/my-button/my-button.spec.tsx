import { newSpecPage } from '@stencil/core/testing';
import { MyButton } from './my-button';

describe('my-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyButton],
      html: `<my-button></my-button>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('button')).toBeTruthy();
  });

  it('renders the correct text', async () => {
    const page = await newSpecPage({
      components: [MyButton],
      html: `<my-button text="Click me"></my-button>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.textContent).toBe('Click me');
  });

  it('updates the text when prop changes', async () => {
    const page = await newSpecPage({
      components: [MyButton],
      html: `<my-button text="First"></my-button>`,
    });
    page.root.text = 'Second';
    await page.waitForChanges();
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.textContent).toBe('Second');
  });
});