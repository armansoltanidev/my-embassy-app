import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">ورود به حساب کاربری</h1>
        <p className="text-balance text-sm text-muted-foreground">
          برای ورود به حساب کاربری خود، لطفا ایمیل و رمز عبور خود را وارد کنید.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">کلمه عبور</Label>
            <a
              href="#"
              className="mr-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              کلمه عبور را فراموش کرده‌اید؟
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          ورود
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            ورود از طریق
          </span>
        </div>
        <Button variant="outline" className="w-full">
          توکن سخت افزاری
        </Button>
      </div>
      <div className="text-center text-sm">
        حساب کاربری ندارید؟{" "}
        <a href="/signup" className="underline underline-offset-4">
          ثبت نام
        </a>
      </div>
    </form>
  );
}
