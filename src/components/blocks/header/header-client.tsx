"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Header as HeaderType } from "@/types/blocks/header";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import LocaleToggle from "@/components/locale/toggle";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/theme/toggle";
import ThemeLogo from "@/components/blocks/logo/ThemeLogo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import HeaderNavLink from "./header-nav-link";

export default function HeaderClient({ header }: { header: HeaderType }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {/* PC 端交互增强 */}
      <div className="hidden lg:block absolute top-0 right-0 z-50 pr-4 md:pr-6 lg:pr-8">
        <div className="pt-4">
          <div className="flex gap-2 items-center">
            {header.show_locale && <LocaleToggle />}
            {header.show_theme && <ThemeToggle />}

            {header.buttons?.map((item, i) => {
              const isPrimary = i === 0;
              return (
                <Button
                  key={i}
                  variant={item.variant}
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300",
                    isPrimary
                      ? "bg-gradient-to-r from-green-500 to-cyan-500 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 text-white hover:shadow-lg hover:shadow-green-500/25 [.dark_&]:hover:shadow-green-400/25 hover:scale-105"
                      : "border-green-500/30 [.dark_&]:border-green-400/40 hover:border-green-500 [.dark_&]:hover:border-green-400"
                  )}
                >
                  <Link
                    href={item.url as any}
                    target={item.target || ""}
                    className="relative z-10 flex items-center gap-1 cursor-pointer"
                  >
                    {item.title}
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    )}
                  </Link>
                  {isPrimary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-500 [.dark_&]:from-cyan-400 [.dark_&]:to-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div
        className={cn(
          "lg:hidden absolute top-0 right-0 pr-4 transition-opacity",
          isSheetOpen ? "z-0 opacity-0 pointer-events-none" : "z-50"
        )}
      >
        <div className="pt-4">
          <Sheet onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                aria-label="打开菜单"
                className="bg-gradient-to-r from-green-500 to-cyan-500 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 text-white hover:shadow-lg hover:shadow-green-500/25 [.dark_&]:hover:shadow-green-400/25"
              >
                <Menu className="size-4" />
                <span className="sr-only">菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-white/95 [.dark_&]:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200/50 [.dark_&]:border-slate-700/50">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href={(header.brand?.url || "/") as any}
                    className="flex items-center gap-2"
                  >
                    {header.brand?.logo && (
                      <ThemeLogo
                        logo={header.brand.logo}
                        title={header.brand.title}
                        className="w-8"
                        decorative
                      />
                    )}
                    {header.brand?.title && (
                      <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 bg-clip-text text-transparent">
                        {header.brand?.title || ""}
                      </span>
                    )}
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mb-8 mt-8 flex flex-col gap-4">
                <Accordion type="single" collapsible className="w-full">
                  {header.nav?.items?.map((item, i) => {
                    if (item.children && item.children.length > 0) {
                      return (
                        <AccordionItem
                          key={i}
                          value={item.title || ""}
                          className="border-b border-slate-200/50 [.dark_&]:border-slate-700/50"
                        >
                          <AccordionTrigger className="my-4 px-4 py-0 font-semibold hover:no-underline text-left hover:text-green-600 [.dark_&]:hover:text-green-400 transition-colors">
                            <div className="flex items-center gap-2">
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0"
                                />
                              )}
                              <span>{item.title}</span>
                              {item.is_new && (
                                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="mt-2">
                            {item.children.map((iitem, ii) => (
                              <HeaderNavLink
                                key={ii}
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none outline-hidden transition-all hover:bg-gradient-to-r hover:from-green-500/10 hover:to-cyan-500/10 [.dark_&]:hover:from-green-400/20 [.dark_&]:hover:to-cyan-400/20"
                                )}
                                href={iitem.url as any}
                                target={iitem.target}
                                icon={iitem.icon}
                              >
                                <div>
                                  <div className="text-sm font-semibold flex items-center gap-1">
                                    {iitem.title}
                                    {iitem.is_new && (
                                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm leading-snug text-slate-500 [.dark_&]:text-slate-400">
                                    {iitem.description}
                                  </p>
                                </div>
                              </HeaderNavLink>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                    return (
                      <HeaderNavLink
                        key={i}
                        href={item.url as any}
                        target={item.target}
                        className="font-semibold my-4 flex items-center gap-2 px-4 hover:text-green-600 [.dark_&]:hover:text-green-400 transition-colors"
                        icon={item.icon}
                      >
                        {item.title}
                        {item.is_new && (
                          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 [.dark_&]:bg-red-600 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </HeaderNavLink>
                    );
                  })}
                </Accordion>
              </div>
              <div className="flex-1"></div>
              <div className="border-t border-slate-200/50 [.dark_&]:border-slate-700/50 pt-4">
                <div className="mt-2 flex flex-col gap-3">
                  {header.buttons?.map((item, i) => {
                    const isPrimary = i === 0;
                    return (
                      <Button
                        key={i}
                        variant={item.variant}
                        className={cn(
                          isPrimary
                            ? "bg-gradient-to-r from-green-500 to-cyan-500 [.dark_&]:from-green-400 [.dark_&]:to-cyan-400 text-white"
                            : ""
                        )}
                      >
                        <Link
                          href={item.url as any}
                          target={item.target || ""}
                          className="flex items-center gap-1"
                        >
                          {item.title}
                          {item.icon && (
                            <Icon
                              name={item.icon}
                              className="size-4 shrink-0"
                            />
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {header.show_locale && <LocaleToggle />}
                  <div className="flex-1"></div>

                  {header.show_theme && <ThemeToggle />}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
