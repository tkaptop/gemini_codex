/**
 * 通用埋点工具函数
 * 统一管理所有分析事件，支持 GTM / Google Analytics / OpenPanel
 */

// 扩展 Window 类型以支持 dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * 发送埋点事件到 GTM
 * @param eventName 事件名称
 * @param params 事件参数
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  // 仅在浏览器环境且生产环境执行
  if (typeof window === "undefined") {
    return;
  }

  // 开发环境输出日志便于调试
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, params);
  }

  // 发送到 GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

/**
 * 定价相关事件
 */
export const PricingEvents = {
  /**
   * 查看定价页面
   */
  viewPricing: () => {
    trackEvent("view_pricing", {
      page_path: window.location.pathname,
    });
  },

  /**
   * 点击购买按钮
   * @param productId 产品ID
   * @param productName 产品名称
   * @param amount 金额（单位：分）
   * @param currency 货币
   */
  clickBuyButton: (
    productId: string,
    productName: string,
    amount: number,
    currency: string
  ) => {
    trackEvent("click_buy_button", {
      product_id: productId,
      product_name: productName,
      value: amount / 100, // 转换为元
      currency: currency.toUpperCase(),
    });
  },

  /**
   * 开始结账流程
   * @param productId 产品ID
   * @param productName 产品名称
   * @param amount 金额（单位：分）
   * @param currency 货币
   */
  startCheckout: (
    productId: string,
    productName: string,
    amount: number,
    currency: string
  ) => {
    trackEvent("start_checkout", {
      product_id: productId,
      product_name: productName,
      value: amount / 100,
      currency: currency.toUpperCase(),
    });
  },

  /**
   * 购买成功（已有，保持兼容）
   * @param orderId 订单号
   * @param value 金额（单位：元）
   * @param currency 货币
   */
  purchaseSuccess: (orderId: string, value: number, currency: string) => {
    trackEvent("purchase_success", {
      order_id: orderId,
      value: value,
      currency: currency.toUpperCase(),
    });
  },
};

/**
 * 图片生成相关事件
 */
export const ImageEvents = {
  /**
   * 生成图片
   * @param tool 工具名称（gempix2, veo3, upscaler, sora2, wan25）
   * @param credits 消耗积分
   */
  generateImage: (tool: string, credits?: number) => {
    trackEvent("generate_image", {
      tool_name: tool,
      credits_used: credits,
    });
  },

  /**
   * 下载图片
   * @param tool 工具名称
   * @param imageUrl 图片URL（可选，用于统计来源）
   */
  downloadImage: (tool: string, imageUrl?: string) => {
    trackEvent("download_image", {
      tool_name: tool,
      image_url: imageUrl,
    });
  },
};

/**
 * 用户行为相关事件
 */
export const UserEvents = {
  /**
   * 用户注册
   * @param method 注册方式（email, google, github）
   */
  signUp: (method: string) => {
    trackEvent("sign_up", {
      method: method,
    });
  },

  /**
   * 用户登录
   * @param method 登录方式
   */
  login: (method: string) => {
    trackEvent("login", {
      method: method,
    });
  },
};
