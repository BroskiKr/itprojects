import { describe, it, expect } from 'vitest';
import { calculateTipDetails } from './calculator';

describe('Tip Calculator Logic', () => {
  // Тест 1: Базовий розрахунок
  it('повинен правильно рахувати чайові при 15%', () => {
    const result = calculateTipDetails(100, 15);
    expect(result.tip).toBe("15.00");
    expect(result.total).toBe("115.00");
  });

  // Тест 2: Нульові чайові
  it('повинен повертати 0 чайових, якщо відсоток 0', () => {
    const result = calculateTipDetails(200, 0);
    expect(result.tip).toBe("0.00");
    expect(result.total).toBe("200.00");
  });

  // Тест 3: Велика сума (перевірка точності)
  it('повинен коректно працювати з великими сумами', () => {
    const result = calculateTipDetails(1000, 25);
    expect(result.total).toBe("1250.00");
  });

  // Тест 4: Від'ємна сума (валідація бізнес-правил)
  it('повинен повертати null для від’ємного рахунку', () => {
    const result = calculateTipDetails(-50, 15);
    expect(result).toBeNull();
  });

  // Тест 5: Нечислове введення
  it('повинен повертати null, якщо введено текст замість суми', () => {
    const result = calculateTipDetails("abc", 15);
    expect(result).toBeNull();
  });

  // Тест 6: Дробові значення
  it('повинен коректно округлювати до двох знаків', () => {
    const result = calculateTipDetails(33.33, 10);
    expect(result.tip).toBe("3.33");
  });

  // Тест 7: Максимальний відсоток
  it('повинен коректно рахувати при максимальному відсотку (30%)', () => {
    const result = calculateTipDetails(100, 30);
    expect(result.tip).toBe("30.00");
  });
});