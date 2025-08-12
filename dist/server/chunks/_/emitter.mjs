import { B as Button, L as Layout, i as sendEmail, p as prisma, n as logger } from '../nitro/nitro.mjs';
import { EventEmitter } from 'node:events';

function conditional(condition, returnString) {
  if (condition) return String(returnString.if);
  else return String(returnString.else);
}

function financialAccountCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const accountLink = conditional(role === "user", {
    if: `${process.env.BASE_URL}/user/accounts/${data.account.id}`,
    else: `${process.env.BASE_URL}/users/${user.id}/accounts/${data.account.id}`
  });
  const body = `<section>
  <section>
    <p>
      Hello,
      <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>
    <p>
      You are receiving this email because  
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new account.
    </p>
  </section>

  <section>
    <p>Account name: <b>${data.account.name}</b></p>
    <p>Type: <b>${data.account.type}</b></p>
    <p>Ownership Type: <b>${data.account.ownership}</b></p>
  </section>

  <section>
    ${Button({ label: "View account details", href: accountLink })}
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not open an account, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onFinancialAccountCreate = (ctx) => {
  var _a;
  const subject = "Financial Account Creation";
  const userEmail = financialAccountCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = financialAccountCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        title: subject,
        bodyType: "string",
        body: `You created a new account: ${ctx.data.account.name}`
      }
    })
  ]);
};

function depositCreateEmail$1(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new deposit request.
    </p>
  </section>

  <section>
    <p>Amount
      <b style="font-size: 2.5rem;">$${data.transaction.USDAmount.toLocaleString()}</b>
    </p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not initiate this deposit, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onDepositCreate = (ctx) => {
  var _a;
  const subject = "New Deposit Request";
  const userEmail = depositCreateEmail$1({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = depositCreateEmail$1({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You initiated a deposit request of $${ctx.data.transaction.USDAmount.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

function depositCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new withdrawal request
    </p>
  </section>

  <section>
    <p>Amount
      <b style="font-size: 2.5rem;">$${data.transaction.USDAmount.toLocaleString()}</b>
    </p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not initiate this withdrawal, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onWithdrawalCreate = (ctx) => {
  var _a;
  const subject = "New Deposit Request";
  const userEmail = depositCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = depositCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You initiated a withdrawal request of $${ctx.data.transaction.USDAmount.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

function ivestmentCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} started a new investment.
    </p>
  </section>

  <section>
    <p>Deposit Amount: <b>$${data.investment.deposit.toLocaleString()}</b></p>
    <p>Investment Name: <b>${data.investment.investmentName}</b></p>
    <p>Duration: <b>${data.investment.duration} days</b></p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

    <section>
      <p>
        Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not start this investment, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
      </p>
    </section>
</section>`;
  return Layout(body, { subject });
}

const onInvestmentCreate = (ctx) => {
  var _a;
  const subject = "New Financial Investment";
  const userEmail = ivestmentCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = ivestmentCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You started a new investment with $${ctx.data.investment.deposit.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class NotificationEmitter {
  constructor() {
    __publicField(this, "emitter", new EventEmitter());
  }
  emit(eventName, ...eventArg) {
    this.emitter.emit(eventName, ...eventArg);
  }
  on(eventName, handler) {
    this.emitter.on(eventName, handler);
  }
  off(eventName, handler) {
    this.emitter.off(eventName, handler);
  }
}
const notificationEmitter = new NotificationEmitter();
notificationEmitter.on("error", (err) => {
  logger.error("Notification Emitter Error", err);
});
notificationEmitter.on("financial-account:create", onFinancialAccountCreate);
notificationEmitter.on("deposit:create", onDepositCreate);
notificationEmitter.on("withdrawal:create", onWithdrawalCreate);
notificationEmitter.on("investment:create", onInvestmentCreate);

export { notificationEmitter as n };
//# sourceMappingURL=emitter.mjs.map
