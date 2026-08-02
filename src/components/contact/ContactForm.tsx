import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(v: FormState): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "请输入姓名";
    if (!v.email.trim()) e.email = "请输入邮箱";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = "邮箱格式不正确";
    if (!v.message.trim()) e.message = "请输入留言内容";
    return e;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // Wire to API later; for now log + confirm.
    console.log("Contact form submitted:", values);
    setSent(true);
    setValues(empty);
  }

  function field(
    key: keyof FormState,
    label: string,
    type: "text" | "email" | "textarea"
  ) {
    const value = values[key];
    const err = errors[key];
    const common =
      "w-full bg-white/5 border rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/10";
    const border = err
      ? "border-red-400/60"
      : "border-white/15 focus:border-white/40";

    return (
      <label className="block">
        <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">
          {label}
        </span>
        {type === "textarea" ? (
          <textarea
            rows={5}
            value={value}
            onChange={(e) => setValues((s) => ({ ...s, [key]: e.target.value }))}
            placeholder={label}
            className={`${common} ${border} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => setValues((s) => ({ ...s, [key]: e.target.value }))}
            placeholder={label}
            className={`${common} ${border}`}
          />
        )}
        {err && (
          <span className="block mt-1.5 text-xs text-red-300/90">{err}</span>
        )}
      </label>
    );
  }

  return (
    <form onSubmit={onSubmit} className="liquid-glass rounded-3xl p-6 md:p-8 text-white flex flex-col gap-5">
      {field("name", "姓名 Name", "text")}
      {field("email", "邮箱 Email", "email")}
      {field("message", "留言 Message", "textarea")}

      <div className="flex items-center justify-between gap-4 pt-1">
        {sent ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-emerald-300"
          >
            已收到你的留言，我会尽快回复 ✓
          </motion.span>
        ) : (
          <span className="text-xs text-white/40">
            提交后将记录到控制台（API 可后续接入）
          </span>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-white/90 transition-colors"
        >
          <Send size={15} />
          发送 Send
        </button>
      </div>
    </form>
  );
}
