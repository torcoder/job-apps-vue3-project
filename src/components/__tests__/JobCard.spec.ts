import { mount } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import JobCard from '../JobCard.vue';

const mockJob = {
  id: 1,
  title: 'Senior Software Engineer',
  company: 'Tech Innovators',
  location: 'Remote',
  posted_at: '2024-06-25',
  category: 'Development',
  description: 'We are looking for a highly skilled software engineer to join our dynamic team...',
  fields: 'Full Stack, Cloud',
};

const mockJobAccounts = {
  ...mockJob,
  id: 2,
  category: 'Accounts',
  title: 'Junior Accountant',
};

const mockJobUnknownCategory = {
  ...mockJob,
  id: 3,
  category: 'UnknownCategory',
  title: 'Mystery Job',
};


describe('JobCard.vue', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders job title and company name correctly', () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    expect(wrapper.find('h3').text()).toBe(mockJob.title);
    expect(wrapper.find('p').text()).toBe(mockJob.company);
  });

  it('renders location and posted date correctly', () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    const textContent = wrapper.text();
    expect(textContent).toContain(mockJob.location);
    expect(textContent).toContain(mockJob.posted_at);
  });

  it('applies correct icon and color for "Development" category', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    const iconElement = wrapper.find('i.fa-code');
    expect(iconElement.exists()).toBe(true);
    expect(iconElement.classes()).toContain('text-blue-600');
    expect(iconElement.classes()).toContain('dark:text-blue-500');
  });

  it('applies correct icon and color for "Accounts" category', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJobAccounts,
      },
    });

    const iconElement = wrapper.find('i.fa-calculator');
    expect(iconElement.exists()).toBe(true);
    expect(iconElement.classes()).toContain('text-blue-500');
    expect(iconElement.classes()).toContain('dark:text-blue-400');
  });

  it('applies default icon and color for an unknown category', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJobUnknownCategory,
      },
    });

    const iconElement = wrapper.find('i.fa-question-circle');
    expect(iconElement.exists()).toBe(true);
    expect(iconElement.classes()).toContain('text-gray-400');
    expect(iconElement.classes()).toContain('dark:text-gray-500');
  });

  it('emits "click" event when the card is clicked', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0][0]).toEqual(mockJob);
  });

  it('emits "apply" event when the apply button is clicked', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    const applyButton = wrapper.find('button');
    await applyButton.trigger('click');

    expect(wrapper.emitted().apply).toBeTruthy();
    expect(wrapper.emitted().apply[0][0]).toEqual(mockJob);
  });

  it('stops click event propagation when apply button is clicked', async () => {
    const wrapper = mount(JobCard, {
      props: {
        job: mockJob,
      },
    });

    const applyButton = wrapper.find('button');

    await applyButton.trigger('click');

    expect(wrapper.emitted().apply).toBeTruthy();
    expect(wrapper.emitted().click).toBeUndefined();
  });
});
