import { test, expect } from '@playwright/test';

test.describe('Критичний шлях користувача', () => {

  test('Користувач може успішно розрахувати чайові', async ({ page }) => {
    // 1. Відкриваємо сторінку (переконайся, що npm run dev запущено)
    await page.goto('http://localhost:5173');

    // 2. Перевірка коректності відображення інтерфейсу (Крок 4 методички)
    await expect(page.locator('h1')).toContainText('Калькулятор Чайових');
    const input = page.getByPlaceholder(/наприклад, 500/i);
    await expect(input).toBeVisible();

    // 3. Взаємодія: Вводимо суму рахунку
    await input.fill('1000');

    // 4. Взаємодія: Змінюємо відсоток чайових (через слайдер)
    const slider = page.locator('input[type="range"]');
    await slider.fill('20'); // виставляємо 20%

    // 5. Натискаємо кнопку розрахунку
    await page.getByRole('button', { name: /розрахувати/i }).click();

    // 6. Перевірка результату (Assertions)
    const resultsArea = page.locator('.results-area');
    await expect(resultsArea).toBeVisible();
    await expect(resultsArea).toContainText('Сума чайових: 200.00 ₴');
    await expect(resultsArea).toContainText('Загальна сума: 1200.00 ₴');
  });

  test('Показ попередження при порожньому полі', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Натискаємо кнопку без введення даних
    // Оскільки ми використовуємо window.alert, Playwright має його "підхопити"
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Будь ласка, введіть коректну суму рахунку');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: /розрахувати/i }).click();
  });
});