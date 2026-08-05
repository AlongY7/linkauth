/* ============================================================
   Arctic Compass LinkAuth - i18n (Internationalization)
   Supports Chinese (zh) and English (en)
   ============================================================ */

(function () {
  'use strict';

  var LANG_KEY = 'linkauth-lang';
  var SUPPORTED_LANGS = ['zh', 'en'];
  var DEFAULT_LANG = 'zh';

  // ============================================================
  // Translation Strings
  // ============================================================
  var translations = {
    zh: {
      // ---- Common ----
      'common.brand.cn': '北极指南针 链接认证',
      'common.brand.en': 'arctic compass linkauth',
      'common.save': '保存',
      'common.cancel': '取消',
      'common.confirm': '确认',
      'common.close': '关闭',
      'common.back': '返回',
      'common.loading': '加载中...',
      'common.error': '错误',
      'common.success': '成功',
      'common.warning': '警告',
      'common.info': '信息',
      'common.copy': '复制',
      'common.copied': '已复制',
      'common.download': '下载',
      'common.required': '必填',
      'common.optional': '可选',
      'common.search': '搜索',
      'common.filter': '筛选',
      'common.reset': '重置',
      'common.refresh': '刷新',
      'common.export': '导出',
      'common.import': '导入',
      'common.delete': '删除',
      'common.edit': '编辑',
      'common.add': '添加',
      'common.remove': '移除',
      'common.enable': '启用',
      'common.disable': '禁用',
      'common.yes': '是',
      'common.no': '否',
      'common.all': '全部',
      'common.none': '无',
      'common.more': '更多',
      'common.less': '收起',
      'common.seconds': '秒',
      'common.minutes': '分钟',
      'common.hours': '小时',
      'common.days': '天',

      // ---- Navigation ----
      'nav.home': '首页',
      'nav.register': '注册',
      'nav.login': '登录',
      'nav.user_center': '用户中心',
      'nav.developer': '开发者',
      'nav.ops': '平台观测',
      'nav.docs': '文档',
      'nav.github': 'GitHub',

      // ---- Theme ----
      'theme.light': '浅色主题',
      'theme.dark': '深色主题',
      'theme.toggle': '切换主题',
      'theme.auto': '跟随系统',

      // ---- Language ----
      'lang.zh': '中文',
      'lang.en': 'English',
      'lang.toggle': '切换语言',

      // ---- Home Page ----
      'home.hero.title': '北极指南针 链接认证',
      'home.hero.subtitle': '无人式自动化流程加密中心制身份认证与授权网关',
      'home.hero.tagline': '以国密算法为信任锚点，把授权、风控、审计、清理和轮换交给自动化流程完成。',
      'home.hero.register': '立即注册',
      'home.hero.login': '登录',
      'home.hero.developer': '开发者接入',
      'home.portal.title': '统一入口',
      'home.portal.register': '注册身份',
      'home.portal.register.desc': '创建不依赖手机号、邮箱和实名信息的 LinkAuth 身份，系统自动生成 link_id 与 manager_key。',
      'home.portal.user': '用户端后台',
      'home.portal.user.desc': '查看授权详情、管理会话设备、撤销应用授权，并导出用户自主掌控的数据。',
      'home.portal.developer': '开发者控制台',
      'home.portal.developer.desc': '自助查看应用状态、授权用户、调用统计、沙箱流程和 Webhook 配置。',
      'home.portal.ops': '平台自治观测台',
      'home.portal.ops.desc': '观测自动化策略、自愈事件、全局态势和异常聚类，不引入人工审核流程。',
      'home.features.title': '核心特性',
      'home.features.opensource': 'MIT 开源',
      'home.features.opensource.desc': '代码透明可审计，遵循 MIT 协议。',
      'home.features.crypto': '国密加密',
      'home.features.crypto.desc': '以 SM2/SM3/SM4 为核心，提供完整加密能力。',
      'home.features.auto': '自动化流程',
      'home.features.auto.desc': '授权码、令牌、审计、风控均由系统自动执行。',
      'home.features.privacy': '隐私保护',
      'home.features.privacy.desc': '不收集手机号、邮箱、实名信息，不设人工审核。',
      'home.overview.title': '运行态概览',
      'home.overview.loading': '加载中',
      'home.overview.unavailable': '概览数据暂不可用',
      'home.metrics.users': '活跃用户',
      'home.metrics.applications': 'OAuth 应用',
      'home.metrics.activeTokens': '有效令牌',
      'home.metrics.onlineDevices': '在线设备',
      'home.metrics.activeSessions': '用户中心会话',
      'home.metrics.riskIps': '风险 IP',
      'home.metrics.audits24h': '24 小时审计',

      // ---- Footer ----
      'footer.copyright': '北极指南针 链接认证。基于 MIT 协议开源发布。',
      'footer.github': '开源地址',

      // ---- Login Page ----
      'login.title': '登录 Arctic Compass LinkAuth',
      'login.subtitle': '使用你的北极指南针身份登录',
      'login.account.label': '登录账号 / 用户名',
      'login.account.placeholder': '输入登录账号（如 Abc123@ArcticCompass_id）',
      'login.account.hint': '登录账号格式：前缀 + 后缀之一，例如 Abc123@ArcticCompass_id、MyAI@ArcticCompass_ai',
      'login.password.label': '密码',
      'login.password.placeholder': '输入密码',
      'login.submit': '登录',
      'login.submitting': '登录中...',
      'login.forgot': '找回密码',
      'login.register': '创建账号',
      'login.developer': '第三方应用开发者？',
      'login.developer.link': '进入开发者控制台',

      // ---- Register Page ----
      'register.title': '创建 Arctic Compass LinkAuth 账号',
      'register.subtitle': '注册北极指南针身份，安全存储你的授权信息',
      'register.account.label': '账号前缀',
      'register.account.optional': '可选，不填则自动生成',
      'register.account.prefix': '自定义前缀，留空自动生成',
      'register.account.preview': '完整账号预览',
      'register.account.auto': '（自动生成）',
      'register.account.hint': '前缀至少2个字符（字母+数字），不同后缀的相同前缀视为不同账号',
      'register.username.label': '用户名',
      'register.username.placeholder': '输入用户名',
      'register.username.hint': '2-32 个字符，支持字母、数字、中文',
      'register.password.label': '密码',
      'register.password.placeholder': '输入密码',
      'register.password.strength': '请输入密码（至少8位）',
      'register.password.too_short': '密码长度不足8位',
      'register.password.weak': '弱 - 建议增加长度和复杂度',
      'register.password.medium': '中 - 可考虑增加特殊字符',
      'register.password.strong': '强 - 密码强度足够',
      'register.confirm_password.label': '确认密码',
      'register.confirm_password.placeholder': '再次输入密码',
      'register.security.label': '安全问题',
      'register.security.desc': '至少1组，最多3组',
      'register.security.add': '添加安全问题',
      'register.security.select': '选择安全问题',
      'register.security.custom': '自定义问题',
      'register.security.custom_placeholder': '输入自定义问题',
      'register.security.answer': '答案',
      'register.security.answer_placeholder': '输入答案',
      'register.security.question': '问题',
      'register.security.remove': '删除',
      'register.submit': '注册',
      'register.submitting': '注册中...',
      'register.has_account': '已有账号？',
      'register.has_account.link': '立即登录',
      'register.success.title': '注册成功',
      'register.success.warning': '请务必截图备份以下信息！manager_key 仅在此显示一次，丢失无法找回。',
      'register.success.link_id': 'link_id（用户身份标识）',
      'register.success.login_account': 'login_account（登录账号）',
      'register.success.manager_key': 'manager_key（管理器密钥 - 请立即备份！）',
      'register.success.notice': 'manager_key 是管理账号的唯一凭证，用于修改密码、管理授权应用、远程登出设备等操作。请立即截图保存，Arctic Compass LinkAuth 不会存储你的 manager_key 明文。',
      'register.success.checkbox': '我已截图备份以上信息，确认已妥善保管 manager_key',
      'register.suffix.id': '通用',
      'register.suffix.user': '个人',
      'register.suffix.ai': 'AI',
      'register.suffix.ent': '企业',
      'register.suffix.dev': '开发者',
      'register.suffix.org': '组织机构',

      // ---- Password Reset ----
      'pwreset.title': '找回密码',
      'pwreset.subtitle': '通过安全问题验证重置你的密码',
      'pwreset.step1.label': '登录账号',
      'pwreset.step1.placeholder': '输入你的登录账号（如 Abc123@ArcticCompass_id）',
      'pwreset.step1.hint': '输入注册时使用的完整登录账号',
      'pwreset.step1.submit': '下一步',
      'pwreset.step1.submitting': '验证中...',
      'pwreset.step2.title': '请回答以下安全问题以验证身份',
      'pwreset.step2.new_password': '新密码',
      'pwreset.step2.confirm': '确认新密码',
      'pwreset.step2.submit': '重置密码',
      'pwreset.step2.submitting': '重置中...',
      'pwreset.step3.title': '密码重置成功',
      'pwreset.step3.desc': '你的密码已成功重置，请使用新密码登录。',
      'pwreset.step3.login': '前往登录',
      'pwreset.back': '返回登录页面',
      'pwreset.question': '问题',
      'pwreset.answer': '答案',
      'pwreset.answer_placeholder': '输入答案',

      // ---- Authorize Page ----
      'authorize.title': '授权 - Arctic Compass LinkAuth',
      'authorize.requesting': '正在请求授权',
      'authorize.will_authorize': '将授权以下权限给此应用',
      'authorize.permission.openid': '查看你的身份标识（link_id）',
      'authorize.permission.profile': '查看你的用户信息',
      'authorize.authorize': '授权',
      'authorize.authorizing': '授权中...',
      'authorize.reject': '拒绝',
      'authorize.after_auth': '授权后你将跳转回应用',
      'authorize.not_logged_in': '请先登录后再授权',

      // ---- User Center ----
      'uc.title': '用户中心',
      'uc.verify.title': '验证管理器密钥',
      'uc.verify.desc': '请输入你的 manager_key 以访问用户中心',
      'uc.verify.link_id': 'link_id',
      'uc.verify.link_id_placeholder': '输入 link_id',
      'uc.verify.manager_key': 'manager_key',
      'uc.verify.manager_key_placeholder': '输入管理器密钥',
      'uc.verify.submit': '验证',
      'uc.verify.submitting': '验证中...',
      'uc.profile.title': '个人信息',
      'uc.profile.edit': '编辑',
      'uc.profile.link_id': 'link_id',
      'uc.profile.username': '用户名',
      'uc.profile.login_account': '登录账号',
      'uc.profile.not_set': '（未设置）',
      'uc.password.title': '修改密码',
      'uc.password.old': '当前密码',
      'uc.password.new': '新密码',
      'uc.password.confirm': '确认新密码',
      'uc.password.submit': '修改密码',
      'uc.password.success': '密码修改成功',
      'uc.security.title': '安全问题管理',
      'uc.security.edit': '修改',
      'uc.security.none': '未设置安全问题',
      'uc.security.save': '保存修改',
      'uc.security.add': '添加问题',
      'uc.security.question': '问题',
      'uc.security.answer': '答案',
      'uc.security.update_success': '安全问题更新成功',
      'uc.apps.title': '已授权应用',
      'uc.apps.none': '暂无已授权应用',
      'uc.apps.name': '应用名称',
      'uc.apps.time': '授权时间',
      'uc.apps.revoke': '撤销',
      'uc.apps.revoke_confirm': '确定要撤销此应用的授权吗？',
      'uc.apps.revoke_success': '已撤销应用授权',
      'uc.devices.title': '已登录设备',
      'uc.devices.none': '暂无已登录设备',
      'uc.devices.name': '设备名称',
      'uc.devices.last_active': '最后活跃',
      'uc.devices.status': '状态',
      'uc.devices.online': '在线',
      'uc.devices.offline': '离线',
      'uc.devices.logout': '远程登出',
      'uc.devices.logout_confirm': '确定要远程登出此设备吗？',
      'uc.devices.logout_success': '已远程登出设备',
      'uc.danger.title': '危险区域',
      'uc.danger.desc': '禁用账号后将无法登录和使用所有授权服务。此操作不可撤销。',
      'uc.danger.disable': '禁用账号',
      'uc.danger.disable_confirm': '确定要禁用此账号吗？此操作不可撤销！',
      'uc.danger.disable_confirm2': '再次确认：禁用后你将无法登录和使用所有授权服务。',
      'uc.danger.disable_reason': '请输入禁用原因（可选）:',
      'uc.danger.disabled': '账号已禁用',

      // ---- Developer Console ----
      'dev.title': '开发者控制台',
      'dev.apps.title': '我的应用',
      'dev.apps.create': '创建应用',
      'dev.apps.name': '应用名称',
      'dev.apps.desc': '应用描述',
      'dev.apps.client_id': 'Client ID',
      'dev.apps.redirect_uri': '回调地址',
      'dev.apps.status': '状态',
      'dev.apps.active': '活跃',
      'dev.apps.inactive': '非活跃',
      'dev.stats.title': '调用统计',
      'dev.webhook.title': 'Webhook 配置',
      'dev.webhook.url': 'Webhook URL',
      'dev.webhook.events': '事件类型',
      'dev.webhook.save': '保存配置',

      // ---- Error Messages ----
      'error.network': '网络错误，请检查连接',
      'error.server': '服务器错误，请稍后重试',
      'error.unknown': '发生未知错误',
      'error.required_field': '请填写必填字段',
      'error.password_mismatch': '两次输入的密码不一致',
      'error.password_length': '密码长度至少8位',
      'error.username_length': '用户名长度需在2-32个字符之间',
      'error.login_failed': '登录失败',
      'error.register_failed': '注册失败，请重试',
      'error.verify_failed': '验证失败',
      'error.reset_failed': '密码重置失败',
      'error.rate_limit': '请求过于频繁，请稍后重试',
      'error.retry_after': '请等待 %s 秒后重试',
    },

    en: {
      // ---- Common ----
      'common.brand.cn': 'Arctic Compass LinkAuth',
      'common.brand.en': 'arctic compass linkauth',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'common.close': 'Close',
      'common.back': 'Back',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.warning': 'Warning',
      'common.info': 'Info',
      'common.copy': 'Copy',
      'common.copied': 'Copied',
      'common.download': 'Download',
      'common.required': 'Required',
      'common.optional': 'Optional',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.reset': 'Reset',
      'common.refresh': 'Refresh',
      'common.export': 'Export',
      'common.import': 'Import',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.add': 'Add',
      'common.remove': 'Remove',
      'common.enable': 'Enable',
      'common.disable': 'Disable',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.all': 'All',
      'common.none': 'None',
      'common.more': 'More',
      'common.less': 'Less',
      'common.seconds': 's',
      'common.minutes': 'min',
      'common.hours': 'h',
      'common.days': 'd',

      // ---- Navigation ----
      'nav.home': 'Home',
      'nav.register': 'Register',
      'nav.login': 'Login',
      'nav.user_center': 'User Center',
      'nav.developer': 'Developer',
      'nav.ops': 'Observability',
      'nav.docs': 'Docs',
      'nav.github': 'GitHub',

      // ---- Theme ----
      'theme.light': 'Light Theme',
      'theme.dark': 'Dark Theme',
      'theme.toggle': 'Toggle Theme',
      'theme.auto': 'Follow System',

      // ---- Language ----
      'lang.zh': '中文',
      'lang.en': 'English',
      'lang.toggle': 'Toggle Language',

      // ---- Home Page ----
      'home.hero.title': 'Arctic Compass LinkAuth',
      'home.hero.subtitle': 'Unattended Automated Encryption-Centric Identity Authentication & Authorization Gateway',
      'home.hero.tagline': 'Using national cryptographic algorithms as the trust anchor, delegating authorization, risk control, auditing, cleanup, and rotation to automated workflows.',
      'home.hero.register': 'Register',
      'home.hero.login': 'Login',
      'home.hero.developer': 'Developer Access',
      'home.portal.title': 'Unified Portal',
      'home.portal.register': 'Register Identity',
      'home.portal.register.desc': 'Create a LinkAuth identity without phone, email, or real-name info. System auto-generates link_id and manager_key.',
      'home.portal.user': 'User Dashboard',
      'home.portal.user.desc': 'View authorization details, manage sessions and devices, revoke app authorizations, and export your data.',
      'home.portal.developer': 'Developer Console',
      'home.portal.developer.desc': 'Self-service app status, authorized users, usage statistics, sandbox flows, and Webhook configuration.',
      'home.portal.ops': 'Autonomous Observatory',
      'home.portal.ops.desc': 'Observe automation policies, self-healing events, global posture, and anomaly clustering without manual review.',
      'home.features.title': 'Core Features',
      'home.features.opensource': 'MIT Open Source',
      'home.features.opensource.desc': 'Transparent and auditable code under MIT License.',
      'home.features.crypto': 'National Crypto',
      'home.features.crypto.desc': 'SM2/SM3/SM4 as core with full encryption capabilities.',
      'home.features.auto': 'Automated Workflows',
      'home.features.auto.desc': 'Auth codes, tokens, audits, and risk control are fully automated.',
      'home.features.privacy': 'Privacy Protection',
      'home.features.privacy.desc': 'No phone, email, or real-name collection. No manual review.',
      'home.overview.title': 'Operational Overview',
      'home.overview.loading': 'Loading',
      'home.overview.unavailable': 'Overview data unavailable',
      'home.metrics.users': 'Active Users',
      'home.metrics.applications': 'OAuth Apps',
      'home.metrics.activeTokens': 'Active Tokens',
      'home.metrics.onlineDevices': 'Online Devices',
      'home.metrics.activeSessions': 'Active Sessions',
      'home.metrics.riskIps': 'Risk IPs',
      'home.metrics.audits24h': '24h Audits',

      // ---- Footer ----
      'footer.copyright': 'Arctic Compass LinkAuth. Released under the MIT License.',
      'footer.github': 'Open Source',

      // ---- Login Page ----
      'login.title': 'Login to Arctic Compass LinkAuth',
      'login.subtitle': 'Sign in with your Arctic Compass identity',
      'login.account.label': 'Login Account / Username',
      'login.account.placeholder': 'Enter login account (e.g. Abc123@ArcticCompass_id)',
      'login.account.hint': 'Login account format: prefix + suffix, e.g. Abc123@ArcticCompass_id, MyAI@ArcticCompass_ai',
      'login.password.label': 'Password',
      'login.password.placeholder': 'Enter password',
      'login.submit': 'Login',
      'login.submitting': 'Signing in...',
      'login.forgot': 'Forgot Password',
      'login.register': 'Create Account',
      'login.developer': 'Third-party developer?',
      'login.developer.link': 'Developer Console',

      // ---- Register Page ----
      'register.title': 'Create Arctic Compass LinkAuth Account',
      'register.subtitle': 'Register an Arctic Compass identity and securely store your authorization info',
      'register.account.label': 'Account Prefix',
      'register.account.optional': 'Optional, auto-generated if left blank',
      'register.account.prefix': 'Custom prefix, leave blank for auto-generation',
      'register.account.preview': 'Full Account Preview',
      'register.account.auto': '(Auto-generated)',
      'register.account.hint': 'Prefix at least 2 chars (letters+digits). Same prefix with different suffixes are different accounts.',
      'register.username.label': 'Username',
      'register.username.placeholder': 'Enter username',
      'register.username.hint': '2-32 characters, supports letters, digits, Chinese',
      'register.password.label': 'Password',
      'register.password.placeholder': 'Enter password',
      'register.password.strength': 'Enter password (min 8 characters)',
      'register.password.too_short': 'Password too short (min 8 characters)',
      'register.password.weak': 'Weak - consider increasing length and complexity',
      'register.password.medium': 'Medium - consider adding special characters',
      'register.password.strong': 'Strong - password sufficient',
      'register.confirm_password.label': 'Confirm Password',
      'register.confirm_password.placeholder': 'Re-enter password',
      'register.security.label': 'Security Questions',
      'register.security.desc': 'At least 1, up to 3',
      'register.security.add': 'Add Security Question',
      'register.security.select': 'Select a security question',
      'register.security.custom': 'Custom question',
      'register.security.custom_placeholder': 'Enter custom question',
      'register.security.answer': 'Answer',
      'register.security.answer_placeholder': 'Enter answer',
      'register.security.question': 'Question',
      'register.security.remove': 'Remove',
      'register.submit': 'Register',
      'register.submitting': 'Registering...',
      'register.has_account': 'Already have an account?',
      'register.has_account.link': 'Login',
      'register.success.title': 'Registration Successful',
      'register.success.warning': 'Please screenshot and backup the following information! manager_key is shown only once and cannot be recovered if lost.',
      'register.success.link_id': 'link_id (User Identity)',
      'register.success.login_account': 'login_account (Login Account)',
      'register.success.manager_key': 'manager_key (Manager Key - Backup Immediately!)',
      'register.success.notice': 'manager_key is the sole credential for managing your account. It is used for changing passwords, managing authorized apps, and remotely logging out devices. Please screenshot and save it immediately. Arctic Compass LinkAuth does not store your manager_key in plaintext.',
      'register.success.checkbox': 'I have backed up the above information and confirm I have safely stored the manager_key',
      'register.suffix.id': 'General',
      'register.suffix.user': 'Personal',
      'register.suffix.ai': 'AI',
      'register.suffix.ent': 'Enterprise',
      'register.suffix.dev': 'Developer',
      'register.suffix.org': 'Organization',

      // ---- Password Reset ----
      'pwreset.title': 'Reset Password',
      'pwreset.subtitle': 'Verify your identity through security questions to reset your password',
      'pwreset.step1.label': 'Login Account',
      'pwreset.step1.placeholder': 'Enter your login account (e.g. Abc123@ArcticCompass_id)',
      'pwreset.step1.hint': 'Enter the full login account used during registration',
      'pwreset.step1.submit': 'Next',
      'pwreset.step1.submitting': 'Verifying...',
      'pwreset.step2.title': 'Please answer the following security questions to verify your identity',
      'pwreset.step2.new_password': 'New Password',
      'pwreset.step2.confirm': 'Confirm New Password',
      'pwreset.step2.submit': 'Reset Password',
      'pwreset.step2.submitting': 'Resetting...',
      'pwreset.step3.title': 'Password Reset Successful',
      'pwreset.step3.desc': 'Your password has been reset successfully. Please login with your new password.',
      'pwreset.step3.login': 'Go to Login',
      'pwreset.back': 'Back to login',
      'pwreset.question': 'Question',
      'pwreset.answer': 'Answer',
      'pwreset.answer_placeholder': 'Enter answer',

      // ---- Authorize Page ----
      'authorize.title': 'Authorization - Arctic Compass LinkAuth',
      'authorize.requesting': 'Requesting Authorization',
      'authorize.will_authorize': 'will grant the following permissions to this app',
      'authorize.permission.openid': 'View your identity (link_id)',
      'authorize.permission.profile': 'View your profile information',
      'authorize.authorize': 'Authorize',
      'authorize.authorizing': 'Authorizing...',
      'authorize.reject': 'Deny',
      'authorize.after_auth': 'You will be redirected back to the app after authorization',
      'authorize.not_logged_in': 'Please login first before authorizing',

      // ---- User Center ----
      'uc.title': 'User Center',
      'uc.verify.title': 'Verify Manager Key',
      'uc.verify.desc': 'Please enter your manager_key to access the user center',
      'uc.verify.link_id': 'link_id',
      'uc.verify.link_id_placeholder': 'Enter link_id',
      'uc.verify.manager_key': 'manager_key',
      'uc.verify.manager_key_placeholder': 'Enter manager key',
      'uc.verify.submit': 'Verify',
      'uc.verify.submitting': 'Verifying...',
      'uc.profile.title': 'Profile',
      'uc.profile.edit': 'Edit',
      'uc.profile.link_id': 'link_id',
      'uc.profile.username': 'Username',
      'uc.profile.login_account': 'Login Account',
      'uc.profile.not_set': '(Not set)',
      'uc.password.title': 'Change Password',
      'uc.password.old': 'Current Password',
      'uc.password.new': 'New Password',
      'uc.password.confirm': 'Confirm New Password',
      'uc.password.submit': 'Change Password',
      'uc.password.success': 'Password changed successfully',
      'uc.security.title': 'Security Questions',
      'uc.security.edit': 'Edit',
      'uc.security.none': 'No security questions set',
      'uc.security.save': 'Save Changes',
      'uc.security.add': 'Add Question',
      'uc.security.question': 'Question',
      'uc.security.answer': 'Answer',
      'uc.security.update_success': 'Security questions updated successfully',
      'uc.apps.title': 'Authorized Apps',
      'uc.apps.none': 'No authorized apps',
      'uc.apps.name': 'App Name',
      'uc.apps.time': 'Authorized At',
      'uc.apps.revoke': 'Revoke',
      'uc.apps.revoke_confirm': 'Are you sure you want to revoke this app authorization?',
      'uc.apps.revoke_success': 'App authorization revoked',
      'uc.devices.title': 'Logged-in Devices',
      'uc.devices.none': 'No logged-in devices',
      'uc.devices.name': 'Device Name',
      'uc.devices.last_active': 'Last Active',
      'uc.devices.status': 'Status',
      'uc.devices.online': 'Online',
      'uc.devices.offline': 'Offline',
      'uc.devices.logout': 'Remote Logout',
      'uc.devices.logout_confirm': 'Are you sure you want to remotely logout this device?',
      'uc.devices.logout_success': 'Device logged out remotely',
      'uc.danger.title': 'Danger Zone',
      'uc.danger.desc': 'Disabling your account will prevent login and use of all authorized services. This action is irreversible.',
      'uc.danger.disable': 'Disable Account',
      'uc.danger.disable_confirm': 'Are you sure you want to disable this account? This action is irreversible!',
      'uc.danger.disable_confirm2': 'Confirm again: after disabling, you will not be able to login or use any authorized services.',
      'uc.danger.disable_reason': 'Enter disable reason (optional):',
      'uc.danger.disabled': 'Account disabled',

      // ---- Developer Console ----
      'dev.title': 'Developer Console',
      'dev.apps.title': 'My Apps',
      'dev.apps.create': 'Create App',
      'dev.apps.name': 'App Name',
      'dev.apps.desc': 'Description',
      'dev.apps.client_id': 'Client ID',
      'dev.apps.redirect_uri': 'Redirect URI',
      'dev.apps.status': 'Status',
      'dev.apps.active': 'Active',
      'dev.apps.inactive': 'Inactive',
      'dev.stats.title': 'Usage Statistics',
      'dev.webhook.title': 'Webhook Configuration',
      'dev.webhook.url': 'Webhook URL',
      'dev.webhook.events': 'Event Types',
      'dev.webhook.save': 'Save Configuration',

      // ---- Error Messages ----
      'error.network': 'Network error, please check your connection',
      'error.server': 'Server error, please try again later',
      'error.unknown': 'An unknown error occurred',
      'error.required_field': 'Please fill in required fields',
      'error.password_mismatch': 'Passwords do not match',
      'error.password_length': 'Password must be at least 8 characters',
      'error.username_length': 'Username must be 2-32 characters',
      'error.login_failed': 'Login failed',
      'error.register_failed': 'Registration failed, please try again',
      'error.verify_failed': 'Verification failed',
      'error.reset_failed': 'Password reset failed',
      'error.rate_limit': 'Too many requests, please try again later',
      'error.retry_after': 'Please wait %s seconds before retrying',
    }
  };

  // ============================================================
  // Core Functions
  // ============================================================
  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      // ignore
    }
  }

  function detectBrowserLang() {
    var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (lang.indexOf('zh') === 0) return 'zh';
    return 'en';
  }

  function getCurrentLang() {
    var stored = getStoredLang();
    if (stored && SUPPORTED_LANGS.indexOf(stored) >= 0) {
      return stored;
    }
    return detectBrowserLang();
  }

  /**
   * Translate a key with optional format arguments.
   * Usage: I18n.t('key') or I18n.t('key', arg1, arg2, ...)
   */
  function t(key) {
    var lang = getCurrentLang();
    var dict = translations[lang] || translations[DEFAULT_LANG];
    var text = dict[key] || (translations[DEFAULT_LANG] && translations[DEFAULT_LANG][key]) || key;

    // Handle format arguments
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      text = text.replace(/%s/g, function () {
        return args.shift() || '';
      });
    }

    return text;
  }

  /**
   * Apply translations to all elements with [data-i18n] attribute
   */
  function applyTranslations(root) {
    root = root || document;
    var elements = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (!key) continue;
      var text = t(key);

      // Handle different element types
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.type === 'text' || el.type === 'password' || el.type === 'search' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        }
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    }

    // Handle [data-i18n-title]
    var titleEls = root.querySelectorAll('[data-i18n-title]');
    for (var j = 0; j < titleEls.length; j++) {
      var tel = titleEls[j];
      tel.title = t(tel.getAttribute('data-i18n-title'));
    }

    // Handle [data-i18n-placeholder]
    var placeholderEls = root.querySelectorAll('[data-i18n-placeholder]');
    for (var k = 0; k < placeholderEls.length; k++) {
      var pel = placeholderEls[k];
      pel.placeholder = t(pel.getAttribute('data-i18n-placeholder'));
    }
  }

  /**
   * Switch language and persist
   */
  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) < 0) {
      console.warn('[i18n] Unsupported language:', lang);
      return;
    }
    setStoredLang(lang);
    applyTranslations();

    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: lang } }));
  }

  /**
   * Toggle between Chinese and English
   */
  function toggleLang() {
    var current = getCurrentLang();
    var newLang = current === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    return newLang;
  }

  // ============================================================
  // Initialize
  // ============================================================
  function init() {
    applyTranslations();

    // Listen for dynamically added content
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        var shouldApply = false;
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type === 'childList') {
            for (var j = 0; j < mutation.addedNodes.length; j++) {
              var node = mutation.addedNodes[j];
              if (node.nodeType === 1) {
                if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                  shouldApply = true;
                  break;
                }
                if (node.querySelectorAll) {
                  var nested = node.querySelectorAll('[data-i18n]');
                  if (nested.length > 0) {
                    shouldApply = true;
                    break;
                  }
                }
              }
            }
          }
          if (shouldApply) break;
        }
        if (shouldApply) {
          applyTranslations();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================================
  // Public API
  // ============================================================
  window.I18n = {
    t: t,
    getCurrentLang: getCurrentLang,
    setLang: setLang,
    toggleLang: toggleLang,
    applyTranslations: applyTranslations,
    SUPPORTED_LANGS: SUPPORTED_LANGS
  };
})();