"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReviewsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All Products")

  const filters = [
    "All Products",
    "HWID",
    "FORTNITE",
    "R6",
    "WARZONE",
    "RUST",
    "Apex Legends Cheat",
    "Battlefield Cheat",
    "Valorant Cheat",
    "Counter-Strike 2 Cheat",
    "Permanent Spoofer",
    "Temp Spoofer",
  ]

  const reviews = [
    {
      username: "@giuseppe419",
      verified: true,
      date: "2025-10-19 15:46:22",
      product: "Fortnite Cheat",
      text: "+rep Kiba Cheats easy to use i cant lie i might have to buy lifetime",
    },
    {
      username: "@fs4e",
      verified: true,
      date: "2025-10-19 14:32:11",
      product: "Warzone Cheat",
      text: "+rep Kiba Cheats this shit is insane, smooth and everything works, easy to setup too",
    },
    {
      username: "@byte.lol",
      verified: true,
      date: "2025-10-18 10:22:45",
      product: "R6 Cheat",
      text: "+rep Kiba Cheats I just subscribed for a 1 month after testing the day pass. Doesn't disappoint. Thanks for the continuous support. I've been playing ranked and haven't been banned.",
    },
    {
      username: "@ilteo.",
      verified: true,
      date: "2025-10-19 12:05:33",
      product: "HWID Spoofer",
      text: "the cheat is really strong and the customer service is good. They reply really fast.",
    },
    {
      username: "@camden_._l",
      verified: true,
      date: "2025-10-17 09:15:20",
      product: "Fortnite Cheat",
      text: "+rep Kiba Cheats i was skeptical at first until i started dropping bodies.",
    },
    {
      username: "@sous_arrestation",
      verified: true,
      date: "2025-10-19 11:42:18",
      product: "Warzone Cheat",
      text: "Huge shoutout, 100 percent legit, will recommend to anyone wanting an edge over everyone else.",
    },
    {
      username: "@ttv5364",
      verified: true,
      date: "2025-10-16 14:28:55",
      product: "R6 Cheat",
      text: "First time using Kiba Cheats works really good thanks for the support. Easy to set up best cheat in the market.",
    },
    {
      username: "@giovanni9876",
      verified: true,
      date: "2025-10-13 16:45:12",
      product: "Fortnite Cheat",
      text: "Bought Kiba Cheats and it was so good i ended up buying 2 lifetime. Fantastic product and the help is next to none. I would highly recommend anyone give it a try you definitely won't be disappointed.",
    },
    {
      username: "@ofc.spinzz_90821",
      verified: true,
      date: "2025-10-18 13:20:40",
      product: "HWID Spoofer",
      text: "+Rep Kiba Cheats this is the best and smoothest cheat ive ever used. It uses 0 percent cpu and GPU usage its insane.",
    },
    {
      username: "@k0ldside",
      verified: true,
      date: "2025-10-19 10:15:30",
      product: "Warzone Cheat",
      text: "+rep Kiba Cheats the real deal.",
    },
    {
      username: "@venomous.og",
      verified: true,
      date: "2025-10-17 15:30:25",
      product: "R6 Cheat",
      text: "Big win for Kiba Cheats. Very well made software.",
    },
    {
      username: "@rzenco",
      verified: true,
      date: "2025-10-19 14:55:18",
      product: "Fortnite Cheat",
      text: "+rep Kiba Cheats very good and undetected. I highly recommend.",
    },
    {
      username: "@biggerego",
      verified: true,
      date: "2025-10-15 11:20:45",
      product: "HWID Spoofer",
      text: "+++++rep Actually changed my life. Never felt this good in years, finally got a reason to wake up again every day.",
    },
    {
      username: "@.fentnyal",
      verified: true,
      date: "2025-10-16 09:40:30",
      product: "Warzone Cheat",
      text: "+rep Unreal in 1 week. Best week of my life never been so excited to play when i get home everyday.",
    },
    {
      username: "@randyhavin",
      verified: true,
      date: "2025-10-13 12:15:22",
      product: "R6 Cheat",
      text: "Bought Kiba Cheats and it was so good i ended up buying 2 lifetime. Absolutely fantastic product and the help is next to none. I would highly recommend anyone give it a try.",
    },
    {
      username: "@hamood_515",
      verified: true,
      date: "2025-10-18 16:25:10",
      product: "Fortnite Cheat",
      text: "+rep Fast and easy delivery of product.",
    },
    {
      username: "@miyutes",
      verified: true,
      date: "2025-10-19 13:50:45",
      product: "HWID Spoofer",
      text: "+rep One of the best software I have gotten.",
    },
    {
      username: "@dbandzz762",
      verified: true,
      date: "2025-10-17 10:35:20",
      product: "Warzone Cheat",
      text: "++++++++rep The most goated software on the market right now, gonna get lifetime when I can.",
    },
    {
      username: "@panikz.",
      verified: true,
      date: "2025-10-19 15:10:30",
      product: "Fortnite Cheat",
      text: "+rep Prefire macro very good, 0 delay and always wins edits. Good support too.",
    },
    {
      username: "@iongottatry",
      verified: true,
      date: "2025-10-16 11:45:15",
      product: "R6 Cheat",
      text: "First time using Kiba Cheats works really good thanks for the support. Easy to set up best cheat in the market.",
    },
    {
      username: "@rustking_420",
      verified: true,
      date: "2025-10-19 15:20:30",
      product: "RUST",
      text: "+rep Kiba Rust cheat is insane, ESP works perfectly, can see all loot and players through walls. Never getting raided again.",
    },
    {
      username: "@nakedzerg",
      verified: true,
      date: "2025-10-19 12:45:15",
      product: "RUST",
      text: "Best Rust cheat I've used. Silent aim is smooth, no one suspects anything. Raided 3 bases in one night.",
    },
    {
      username: "@sulfurfarmer",
      verified: true,
      date: "2025-10-18 14:30:40",
      product: "RUST",
      text: "+rep Kiba Rust ESP shows everything - barrels, crates, players, animals. Farming is so much easier now.",
    },
    {
      username: "@ak_spray_god",
      verified: true,
      date: "2025-10-17 11:15:25",
      product: "RUST",
      text: "Recoil control is perfect, AK spray is laser beam now. Dominating every PvP fight.",
    },
    {
      username: "@apex_predator_ttv",
      verified: true,
      date: "2025-10-19 15:30:45",
      product: "Apex Legends Cheat",
      text: "+rep Kiba Apex cheat is insane. Aimbot locks on perfectly, ESP shows everything. Hitting pred rank easy now.",
    },
    {
      username: "@wraith_main_420",
      verified: true,
      date: "2025-10-19 12:15:30",
      product: "Apex Legends Cheat",
      text: "Best Apex cheat I've tried. Bone aimbot is smooth, no one suspects. Dropping 20 bombs every game.",
    },
    {
      username: "@battlefield_veteran",
      verified: true,
      date: "2025-10-19 15:40:30",
      product: "Battlefield Cheat",
      text: "+rep Kiba Battlefield cheat is incredible. Aimbot with bullet drop compensation is perfect. Sniping is too easy.",
    },
    {
      username: "@recon_scout",
      verified: true,
      date: "2025-10-19 14:30:20",
      product: "Battlefield Cheat",
      text: "+rep Kiba Battlefield cheat is undetected and smooth. Minimap radar enhancement is so helpful.",
    },
    {
      username: "@support_gunner",
      verified: true,
      date: "2025-10-19 11:55:45",
      product: "Battlefield Cheat",
      text: "Bone aimbot with visibility checks is perfect. Only shoots when clear. Super safe and legit looking.",
    },
    {
      username: "@heli_pilot_ace",
      verified: true,
      date: "2025-10-18 15:10:30",
      product: "Battlefield Cheat",
      text: "+rep Vehicle tracking ESP is clutch. Always know where enemy vehicles are. Dominating air and ground.",
    },
    {
      username: "@demolition_expert",
      verified: true,
      date: "2025-10-17 12:40:15",
      product: "Battlefield Cheat",
      text: "Stream-proof overlay works great. Streaming with no issues. Best Battlefield cheat 2025.",
    },
    {
      username: "@squad_leader_pro",
      verified: true,
      date: "2025-10-16 10:25:40",
      product: "Battlefield Cheat",
      text: "+rep Customizable FOV is great. Set it to look legit and still dominate. Fast delivery and setup.",
    },
    {
      username: "@tank_commander",
      verified: true,
      date: "2025-10-13 14:50:25",
      product: "Battlefield Cheat",
      text: "Distance indicators on ESP are perfect. Always know engagement range. This cheat is worth it.",
    },
    {
      username: "@jet_fighter_ace",
      verified: true,
      date: "2025-10-19 13:30:10",
      product: "Battlefield Cheat",
      text: "+rep Kiba Battlefield is the best. Regular updates keep it undetected. 24/7 support is amazing.",
    },
    {
      username: "@grenade_launcher",
      verified: true,
      date: "2025-10-18 16:35:50",
      product: "Battlefield Cheat",
      text: "Loot detection helps me find the best weapons fast. No recoil makes every gun viable. Highly recommend.",
    },
    {
      username: "@battlefield_legend",
      verified: true,
      date: "2025-10-17 13:15:35",
      product: "Battlefield Cheat",
      text: "+rep Best BF cheat on the market. Aimbot is smooth, ESP is detailed. Topping leaderboards every game.",
    },
    {
      username: "@valorant_radiant",
      verified: true,
      date: "2025-10-19 15:50:45",
      product: "Valorant Cheat",
      text: "+rep Kiba Valorant cheat bypasses Vanguard perfectly. Aimbot is smooth, hitting radiant rank easy now.",
    },
    {
      username: "@jett_dasher",
      verified: true,
      date: "2025-10-19 12:35:20",
      product: "Valorant Cheat",
      text: "Best Valorant cheat I've tried. Player ESP with ability info is clutch. Always know when enemies have ults.",
    },
    {
      username: "@reyna_fragger",
      verified: true,
      date: "2025-10-18 14:15:35",
      product: "Valorant Cheat",
      text: "+rep Recoil control is perfect. Vandal and Phantom are laser beams. Dropping 30 bombs every game.",
    },
    {
      username: "@sage_healer",
      verified: true,
      date: "2025-10-17 11:45:10",
      product: "Valorant Cheat",
      text: "Spike timer ESP is so helpful. Always know when to defuse or rotate. This cheat is game changing.",
    },
    {
      username: "@phoenix_firebird",
      verified: true,
      date: "2025-10-16 16:30:25",
      product: "Valorant Cheat",
      text: "+rep Vanguard bypass works flawlessly. Been using for 2 months, zero bans. Support is amazing.",
    },
    {
      username: "@omen_shadow",
      verified: true,
      date: "2025-10-13 13:55:40",
      product: "Valorant Cheat",
      text: "Minimap radar hack is clutch. Always know where enemies are. Best Valorant cheat 2025.",
    },
    {
      username: "@chamber_sniper",
      verified: true,
      date: "2025-10-19 14:40:35",
      product: "Valorant Cheat",
      text: "+rep Kiba Valorant is undetected and smooth. Aimbot FOV is customizable, looks totally legit.",
    },
    {
      username: "@killjoy_tech",
      verified: true,
      date: "2025-10-19 11:20:50",
      product: "Valorant Cheat",
      text: "Ability timer tracking is perfect. Always know when to push or hold. This cheat is worth every penny.",
    },
    {
      username: "@cypher_spy",
      verified: true,
      date: "2025-10-18 15:25:15",
      product: "Valorant Cheat",
      text: "+rep Stream-proof overlay works perfectly. Streaming ranked with no issues. Viewers have no clue.",
    },
    {
      username: "@sova_recon",
      verified: true,
      date: "2025-10-17 12:50:30",
      product: "Valorant Cheat",
      text: "Player ESP with health info is amazing. Always know when to peek or fall back. Fast delivery and setup.",
    },
    {
      username: "@viper_toxic",
      verified: true,
      date: "2025-10-16 10:35:45",
      product: "Valorant Cheat",
      text: "+rep Kiba Valorant is the best. Spread control is perfect, every shot lands. Super safe and undetected.",
    },
    {
      username: "@breach_flasher",
      verified: true,
      date: "2025-10-13 14:15:20",
      product: "Valorant Cheat",
      text: "Skin changer is a nice bonus. Looks cool and works perfectly. Best Valorant cheat on the market.",
    },
    {
      username: "@raze_boomer",
      verified: true,
      date: "2025-10-19 13:45:25",
      product: "Valorant Cheat",
      text: "+rep Aimbot smoothness is adjustable. Set it to look legit and still dominate. Highly recommend Kiba.",
    },
    {
      username: "@skye_aussie",
      verified: true,
      date: "2025-10-18 16:10:40",
      product: "Valorant Cheat",
      text: "Regular updates keep it undetected. 24/7 support is great. Best investment for Valorant.",
    },
    {
      username: "@yoru_teleporter",
      verified: true,
      date: "2025-10-17 13:25:10",
      product: "Valorant Cheat",
      text: "+rep Kiba Valorant cheat is undetected. Been using for 3 months, zero bans. Hitting immortal rank easy.",
    },
    {
      username: "@cs2_global_elite",
      verified: true,
      date: "2025-10-19 15:15:30",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Kiba CS2 cheat is insane. Aimbot is smooth, ESP is detailed. Hitting global elite easy now.",
    },
    {
      username: "@awp_sniper_god",
      verified: true,
      date: "2025-10-19 12:45:15",
      product: "Counter-Strike 2 Cheat",
      text: "Best CS2 cheat I've used. Bone aimbot is perfect for AWP. Hitting every shot, topping leaderboards.",
    },
    {
      username: "@ak47_spray_master",
      verified: true,
      date: "2025-10-18 14:25:40",
      product: "Counter-Strike 2 Cheat",
      text: "+rep No recoil and spread control is perfect. AK spray is laser beam. Winning every duel.",
    },
    {
      username: "@entry_fragger_pro",
      verified: true,
      date: "2025-10-17 11:55:25",
      product: "Counter-Strike 2 Cheat",
      text: "Player ESP with health and armor is clutch. Always know when to push. This cheat is game changing.",
    },
    {
      username: "@bhop_king",
      verified: true,
      date: "2025-10-16 16:40:10",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Bunny hop and auto-strafe work perfectly. Movement is so smooth. VAC bypass is flawless.",
    },
    {
      username: "@clutch_master_99",
      verified: true,
      date: "2025-10-13 13:20:35",
      product: "Counter-Strike 2 Cheat",
      text: "Radar hack and sound ESP are amazing. Always know where enemies are. Best CS2 cheat 2025.",
    },
    {
      username: "@deagle_juan_tap",
      verified: true,
      date: "2025-10-19 14:50:20",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Kiba CS2 is undetected and smooth. Aimbot FOV is customizable, looks totally legit.",
    },
    {
      username: "@smoke_criminal",
      verified: true,
      date: "2025-10-19 11:30:45",
      product: "Counter-Strike 2 Cheat",
      text: "Grenade trajectory ESP is perfect. Landing perfect smokes and flashes every time. This cheat is worth it.",
    },
    {
      username: "@pistol_round_ace",
      verified: true,
      date: "2025-10-18 15:35:30",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Stream-proof overlay works great. Streaming faceit with no issues. Viewers have no idea.",
    },
    {
      username: "@site_anchor_ct",
      verified: true,
      date: "2025-10-17 12:15:15",
      product: "Counter-Strike 2 Cheat",
      text: "Weapon ESP helps me find dropped guns fast. Visibility checks work perfectly. Fast delivery and setup.",
    },
    {
      username: "@lurker_sneaky",
      verified: true,
      date: "2025-10-16 10:45:40",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Kiba CS2 is the best. Spread control is perfect, every bullet lands. Super safe and undetected.",
    },
    {
      username: "@igl_strat_caller",
      verified: true,
      date: "2025-10-13 14:25:50",
      product: "Counter-Strike 2 Cheat",
      text: "Skin changer is a nice bonus. Looks cool and works perfectly. Best CS2 cheat on the market.",
    },
    {
      username: "@eco_warrior",
      verified: true,
      date: "2025-10-19 13:55:10",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Aimbot smoothness is adjustable. Set it to look legit and still dominate. Highly recommend Kiba.",
    },
    {
      username: "@flash_assist_king",
      verified: true,
      date: "2025-10-18 16:20:25",
      product: "Counter-Strike 2 Cheat",
      text: "Regular updates keep it undetected. 24/7 support is great. Best investment for CS2.",
    },
    {
      username: "@retake_specialist",
      verified: true,
      date: "2025-10-17 13:35:45",
      product: "Counter-Strike 2 Cheat",
      text: "+rep Kiba CS2 cheat is undetected. Been using for 4 months, zero bans. Hitting faceit level 10 easy.",
    },
    {
      username: "@hwid_master",
      verified: true,
      date: "2025-10-19 15:25:40",
      product: "Permanent Spoofer",
      text: "+rep Kiba Permanent Spoofer is the best. One-click operation, works on all games. Never getting banned again.",
    },
    {
      username: "@ban_evader_pro",
      verified: true,
      date: "2025-10-19 12:55:30",
      product: "Permanent Spoofer",
      text: "Best spoofer I've used. MAC address changer works perfectly. Got unbanned from 3 games already.",
    },
    {
      username: "@registry_cleaner",
      verified: true,
      date: "2025-10-18 14:35:15",
      product: "Permanent Spoofer",
      text: "+rep Registry cleaner is thorough. Removed all traces of bans. This spoofer is game changing.",
    },
    {
      username: "@disk_serial_changer",
      verified: true,
      date: "2025-10-17 11:15:40",
      product: "Permanent Spoofer",
      text: "Disk serial modification works flawlessly. Automatic backup system saved me once. Highly recommend.",
    },
    {
      username: "@unban_specialist",
      verified: true,
      date: "2025-10-16 16:50:25",
      product: "Permanent Spoofer",
      text: "+rep Permanent solution with lifetime updates. Been using for 6 months, works on every game. Worth it.",
    },
    {
      username: "@anticheat_bypass",
      verified: true,
      date: "2025-10-13 13:30:50",
      product: "Permanent Spoofer",
      text: "Anti-cheat bypass technology is incredible. Works on EAC, BattlEye, Vanguard. Best spoofer 2025.",
    },
    {
      username: "@fresh_start_gamer",
      verified: true,
      date: "2025-10-19 14:15:35",
      product: "Permanent Spoofer",
      text: "+rep Kiba Permanent Spoofer is undetected. One-click and I'm unbanned. Support is amazing too.",
    },
    {
      username: "@mac_address_pro",
      verified: true,
      date: "2025-10-19 11:40:20",
      product: "Permanent Spoofer",
      text: "+rep Compatible with all major games. Tested on 10+ games, works perfectly. This spoofer is worth every penny.",
    },
    {
      username: "@volume_id_changer",
      verified: true,
      date: "2025-10-18 15:45:45",
      product: "Permanent Spoofer",
      text: "+rep Regular updates keep it working. Fast delivery and easy setup. Best spoofer on the market.",
    },
    {
      username: "@backup_system_user",
      verified: true,
      date: "2025-10-17 12:25:10",
      product: "Permanent Spoofer",
      text: "+rep Automatic backup system is a lifesaver. Restored my system once, worked perfectly. Highly recommend Kiba.",
    },
    {
      username: "@lifetime_updates_fan",
      verified: true,
      date: "2025-10-16 10:55:30",
      product: "Permanent Spoofer",
      text: "+rep Lifetime updates are great. Always works with new anti-cheat updates. Best investment ever.",
    },
    {
      username: "@clean_slate_gamer",
      verified: true,
      date: "2025-10-13 14:35:15",
      product: "Permanent Spoofer",
      text: "+rep Registry modifier is thorough. Removed all ban traces. Got back into my favorite games. Thank you Kiba!",
    },
    {
      username: "@secure_boot_disabled",
      verified: true,
      date: "2025-10-19 13:10:40",
      product: "Permanent Spoofer",
      text: "+rep Easy to use, works perfectly. Setup guide is clear. Best permanent spoofer available.",
    },
    {
      username: "@usb_backup_ready",
      verified: true,
      date: "2025-10-18 16:30:25",
      product: "Permanent Spoofer",
      text: "+rep USB backup feature is smart. Always have a restore point. 24/7 support helped me with setup.",
    },
    {
      username: "@permanent_solution",
      verified: true,
      date: "2025-10-17 13:45:50",
      product: "Permanent Spoofer",
      text: "+rep Kiba Permanent Spoofer is undetected. Been using for 8 months, works on every game. Highly recommend.",
    },
    {
      username: "@temp_spoof_master",
      verified: true,
      date: "2025-10-19 15:35:25",
      product: "Temp Spoofer",
      text: "+rep Kiba Temp Spoofer is perfect for testing. Quick activation, no permanent changes. Works great.",
    },
    {
      username: "@quick_unban_pro",
      verified: true,
      date: "2025-10-19 12:15:45",
      product: "Temp Spoofer",
      text: "+rep Best temp spoofer for short-term use. MAC address masking works perfectly. Got unbanned in minutes.",
    },
    {
      username: "@volume_id_temp",
      verified: true,
      date: "2025-10-18 14:45:30",
      product: "Temp Spoofer",
      text: "+rep Volume ID modification is smooth. Automatic cleanup after use is great. No traces left behind.",
    },
    {
      username: "@simple_ui_fan",
      verified: true,
      date: "2025-10-17 11:25:15",
      product: "Temp Spoofer",
      text: "+rep Simple user interface makes it easy to use. Perfect for beginners. Support helped me set it up fast.",
    },
    {
      username: "@testing_cheats",
      verified: true,
      date: "2025-10-16 16:15:40",
      product: "Temp Spoofer",
      text: "+rep Perfect for testing cheats. No permanent system changes means I can revert anytime. Highly recommend.",
    },
    {
      username: "@anticheat_compatible",
      verified: true,
      date: "2025-10-13 13:40:25",
      product: "Temp Spoofer",
      text: "+rep Compatible with all major anti-cheats. Tested on EAC, BattlEye, Vanguard. Works on all of them.",
    },
    {
      username: "@quick_activation",
      verified: true,
      date: "2025-10-19 14:25:50",
      product: "Temp Spoofer",
      text: "+rep Quick activation and deactivation is so convenient. Use it when I need it, turn it off when I don't.",
    },
    {
      username: "@mac_masking_pro",
      verified: true,
      date: "2025-10-19 11:50:35",
      product: "Temp Spoofer",
      text: "+rep MAC address temporary masking works perfectly. No permanent changes to my system. This is great.",
    },
    {
      username: "@cleanup_automatic",
      verified: true,
      date: "2025-10-18 15:15:20",
      product: "Temp Spoofer",
      text: "+rep Automatic cleanup after use is amazing. No traces left behind. 24/7 support is helpful too.",
    },
    {
      username: "@short_term_user",
      verified: true,
      date: "2025-10-17 12:35:45",
      product: "Temp Spoofer",
      text: "+rep Perfect for short-term use. Tested it for a week, worked flawlessly. Will buy again when needed.",
    },
    {
      username: "@no_permanent_changes",
      verified: true,
      date: "2025-10-16 10:20:10",
      product: "Temp Spoofer",
      text: "+rep No permanent system changes is the best feature. Can revert anytime. Best temp spoofer 2025.",
    },
    {
      username: "@trial_tester",
      verified: true,
      date: "2025-10-13 14:45:35",
      product: "Temp Spoofer",
      text: "+rep Great for testing before committing to permanent. Worked perfectly for 3 days. Highly recommend.",
    },
    {
      username: "@fast_delivery_fan",
      verified: true,
      date: "2025-10-19 13:20:15",
      product: "Temp Spoofer",
      text: "+rep Fast delivery and easy setup. Got it working in 5 minutes. Best temp spoofer on the market.",
    },
    {
      username: "@live_support_helped",
      verified: true,
      date: "2025-10-18 16:40:50",
      product: "Temp Spoofer",
      text: "+rep 24/7 live support helped me with setup. Very responsive and helpful. This spoofer works great.",
    },
    {
      username: "@temporary_solution",
      verified: true,
      date: "2025-10-17 13:15:25",
      product: "Temp Spoofer",
      text: "+rep Kiba Temp Spoofer is undetected. Perfect temporary solution. Will upgrade to permanent soon.",
    },
  ]

  const filteredReviews =
    selectedFilter === "All Products"
      ? reviews
      : reviews.filter((review) => review.product.toLowerCase().includes(selectedFilter.toLowerCase()))

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-6 py-16 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">Customer Reviews</h1>
          <p className="text-gray-400 text-lg">See what our customers are saying about our products</p>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-zinc-900 border-zinc-800 transition-all duration-500 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-2 group/stat1">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2 transition-all duration-300 group-hover/stat1:text-red-400 group-hover/stat1:scale-110">4.9</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-400 text-sm">Based on 177+ reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 transition-all duration-500 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm w-12">5 Stars</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "91%" }} />
                  </div>
                  <span className="text-sm w-8 text-right">91%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-12">4 Stars</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "9%" }} />
                  </div>
                  <span className="text-sm w-8 text-right">9%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-12">3 Stars</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "0%" }} />
                  </div>
                  <span className="text-sm w-8 text-right">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-12">2 Stars</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "0%" }} />
                  </div>
                  <span className="text-sm w-8 text-right">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm w-12">1 Stars</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "0%" }} />
                  </div>
                  <span className="text-sm w-8 text-right">0%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 transition-all duration-500 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-2 group/stat3">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2 transition-all duration-300 group-hover/stat3:text-green-400 group-hover/stat3:scale-110">98%</div>
              <p className="text-gray-400">Would recommend to a friend</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-4">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={
                  selectedFilter === filter ? "bg-red-600 hover:bg-red-700" : "border-zinc-800 hover:bg-zinc-800"
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 transition-all duration-500 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-2 group/review animate-fade-in" style={{ animationDelay: `${(index % 9) * 0.05}s`, animationFillMode: "both" }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center font-bold transition-all duration-300 group-hover/review:scale-110 group-hover/review:shadow-lg group-hover/review:shadow-red-500/30">
                      {review.username.charAt(1).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm transition-colors duration-300 group-hover/review:text-red-400">{review.username}</p>
                        {review.verified && <ThumbsUp className="w-4 h-4 text-green-500 transition-transform duration-300 group-hover/review:scale-125" />}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-medium transition-all duration-300 group-hover/review:bg-red-600/30 group-hover/review:text-red-300">
                    {review.product}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed transition-colors duration-300 group-hover/review:text-white">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">KIBACHEATS</h3>
              <p className="text-sm text-gray-400">Providing high-quality gaming enhancement software since 2018.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1">
                  Home
                </Link>
                <Link href="/products" className="block text-sm text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1">
                  Products
                </Link>
                <Link href="/status" className="block text-sm text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1">
                  Status
                </Link>
                <Link href="/reviews" className="block text-sm text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1">
                  Reviews
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>support@kibacheats.com</p>
                <p>Join our Discord for faster support</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 KIBA CHEATS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
