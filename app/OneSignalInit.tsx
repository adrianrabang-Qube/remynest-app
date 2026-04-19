"use client";

import { useEffect } from "react";

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).OneSignalDeferred =
      (window as any).OneSignalDeferred || [];

    (window as any).OneSignalDeferred.push(async function (OneSignal: any) {
      console.log("OneSignal loaded");

      await OneSignal.init({
        appId: "0783b302-cb5a-474a-9f28-79869c2c0e03",
        notifyButton: {
          enable: true,
        },
      });

      const permission =
        await OneSignal.Notifications.requestPermission();

      console.log("Permission:", permission);

      // 🔥 FIX: wait until subscription exists
      let subId = null;

      while (!subId) {
        subId = OneSignal.User.PushSubscription.id;
        await new Promise((res) => setTimeout(res, 500));
      }

      console.log("SUBSCRIPTION ID:", subId);

      await fetch("/api/save-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId: subId }),
      });

      console.log("Saved to backend");
    });
  }, []);

  return null;
}