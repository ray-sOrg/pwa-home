import type { CardFormData, ValidationError } from "@/types";

// 验证 URL 格式
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 验证卡片数据
export function validateCard(data: CardFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // 名称验证
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "名称不能为空" });
  } else if (data.name.trim().length > 50) {
    errors.push({ field: "name", message: "名称不能超过50个字符" });
  }

  // URL 验证
  if (!data.url || data.url.trim().length === 0) {
    errors.push({ field: "url", message: "URL 不能为空" });
  } else if (!isValidUrl(data.url.trim())) {
    errors.push({ field: "url", message: "URL 格式无效" });
  }

  // 图标验证
  if (!data.icon || data.icon.trim().length === 0) {
    errors.push({ field: "icon", message: "图标不能为空" });
  }

  // 分类验证
  if (!data.categoryId || data.categoryId.trim().length === 0) {
    errors.push({ field: "categoryId", message: "请选择分类" });
  }

  // 描述验证（可选，但有长度限制）
  if (data.description && data.description.length > 200) {
    errors.push({ field: "description", message: "描述不能超过200个字符" });
  }

  return errors;
}

// 检查是否有验证错误
export function hasValidationErrors(errors: ValidationError[]): boolean {
  return errors.length > 0;
}

// 获取特定字段的错误信息
export function getFieldError(
  errors: ValidationError[],
  field: string
): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}
