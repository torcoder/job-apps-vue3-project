import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    document.documentElement.classList.toggle('dark', isDark.value);
  });

  watch(isDark, (newValue) => {
    document.documentElement.classList.toggle('dark', newValue);
  });

  return {
    isDark,
    toggleTheme,
  };
}
