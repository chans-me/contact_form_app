import App from '@/App.vue';

describe('App.vue', () => {
  it('has data', () => {
    expect(typeof App.data).toBe('function');
  });
});