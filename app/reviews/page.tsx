"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Star, Search, ThumbsUp, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("newest")

  const reviews = [
    {
      username: "@giuseppe419",
      verified: true,
      date: "2025-10-19 15:46:22",
      product: "Fortnite Cheat",
      rating: 5,
      text: "+rep Kiba Cheats easy to use i cant lie i might have to buy lifetime",
    },
    {
      username: "@fs4e",
      verified: true,
      date: "2025-10-19 14:32:11",
      product: "Warzone Cheat",
      rating: 5,
      text: "+rep Kiba Cheats this shit is insane, smooth and everything works, easy to setup too",
    },
    {
      username: "@byte.lol",
      verified: true,
      date: "2025-10-18 10:22:45",
      product: "R6 Cheat",
      rating: 5,
      text: "+rep Kiba Cheats I just subscribed for a 1 month after testing the day pass. Doesn't disappoint. Thanks for the continuous support. I've been playing ranked and haven't been banned.",
    },
    {
      username: "@ilteo.",
      verified: true,
      date: "2025-10-19 12:05:33",
      product: "HWID Spoofer",
      rating: 4,
      text: "the cheat is really strong and the customer service is good. They reply really fast.",
    },
    {
      username: "@camden_._l",
      verified: true,
      date: "2025-10-17 09:15:20",
      product: "Fortnite Cheat",
      rating: 5,
      text: "+rep Kiba Cheats i was skeptical at first until i started dropping bodies.",
    },
    {
      username: "@sous_arrestation",
      verified: true,
      date: "2025-10-19 11:42:18",
      product: "Warzone Cheat",
      rating: 5,
      text: "Huge shoutout, 100 percent legit, will recommend to anyone wanting an edge over everyone else.",
    },
    {
      username: "@ttv5364",
      verified: true,
      date: "2025-10-16 14:28:55",
      product: "R6 Cheat",
      rating: 5,
      text: "First time using Kiba Cheats works really good thanks for the support. Easy to set up best cheat in the market.",
    },
    {
      username: "@giovanni9876",
      verified: true,
      date: "2025-10-13 16:45:12",
      product: "Fortnite Cheat",
      rating: 5,
      text: "Bought Kiba Cheats and it was so good i ended up buying 2 lifetime. Fantastic product and the help is next to none. I would highly recommend anyone give it a try you definitely won't be disappointed.",
    },
    {
      username: "@ofc.spinzz_90821",
      verified: true,
      date: "2025-10-18 13:20:40",
      product: "HWID Spoofer",
      rating: 5,
      text: "+Rep Kiba Cheats this is the best and smoothest cheat ive ever used. It uses 0 percent cpu and GPU usage its insane.",
    },
    {
      username: "@k0ldside",
      verified: true,
      date: "2025-10-19 10:15:30",
      product: "Warzone Cheat",
      rating: 5,
      text: "+rep Kiba Cheats the real deal.",
    },
    {
      username: "@venomous.og",
      verified: true,
      date: "2025-10-17 15:30:25",
      product: "R6 Cheat",
      rating: 4,
      text: "Big win for Kiba Cheats. Very well made software.",
    },
    {
      username: "@rzenco",
      verified: true,
      date: "2025-10-19 14:55:18",
      product: "Fortnite Cheat",
      rating: 5,
      text: "+rep Kiba Cheats very good and undetected. I highly recommend.",
    },
    {
      username: "@biggerego",
      verified: true,
      date: "2025-10-15 11:20:45",
      product: "HWID Spoofer",
      rating: 5,
      text: "+++++rep Actually changed my life. Never felt this good in years, finally got a reason to wake up again every day.",
    },
    {
      username: "@.fentnyal",
      verified: true,
      date: "2025-10-16 09:40:30",
      product: "Warzone Cheat",
      rating: 5,
      text: "+rep Unreal in 1 week. Best week of my life never been so excited to play when i get home everyday.",
    },
    {
      username: "@randyhavin",
      verified: true,
      date: "2025-10-13 12:15:22",
      product: "R6 Cheat",
      rating: 5,
      text: "Bought Kiba Cheats and it was so good i ended up buying 2 lifetime. Absolutely fantastic product and the help is next to none. I would highly recommend anyone give it a try.",
    },
    {
      username: "@hamood_515",
      verified: true,
      date: "2025-10-18 16:25:10",
      product: "Fortnite Cheat",
      rating: 5,
      text: "+rep Fast and easy delivery of product.",
    },
    {
      username: "@miyutes",
      verified: true,
      date: "2025-10-19 13:50:45",
      product: "HWID Spoofer",
      rating: 5,
      text: "+rep One of the best software I have gotten.",
    },
    {
      username: "@dbandzz762",
      verified: true,
      date: "2025-10-17 10:35:20",
      product: "Warzone Cheat",
      rating: 5,
      text: "++++++++rep The most goated software on the market right now, gonna get lifetime when I can.",
    },
    {
      username: "@panikz.",
      verified: true,
      date: "2025-10-19 15:10:30",
      product: "Fortnite Cheat",
      rating: 5,
      text: "+rep Prefire macro very good, 0 delay and always wins edits. Good support too.",
    },
    {
      username: "@iongottatry",
      verified: true,
      date: "2025-10-16 11:45:15",
      product: "R6 Cheat",
      rating: 4,
      text: "First time using Kiba Cheats works really good thanks for the support. Easy to set up best cheat in the market.",
    },
    {
      username: "@rustking_420",
      verified: true,
      date: "2025-10-19 15:20:30",
      product: "RUST",
      rating: 5,
      text: "+rep Kiba Rust cheat is insane, ESP works perfectly, can see all loot and players through walls. Never getting raided again.",
    },
    {
      username: "@nakedzerg",
      verified: true,
      date: "2025-10-19 12:45:15",
      product: "RUST",
      rating: 5,
      text: "Best Rust cheat I've used. Silent aim is smooth, no one suspects anything. Raided 3 bases in one night.",
    },
    {
      username: "@sulfurfarmer",
      verified: true,
      date: "2025-10-18 14:30:40",
      product: "RUST",
      rating: 5,
      text: "+rep Kiba Rust ESP shows everything - barrels, crates, players, animals. Farming is so much easier now.",
    },
    {
      username: "@ak_spray_god",
      verified: true,
      date: "2025-10-17 11:15:25",
      product: "RUST",
      rating: 5,
      text: "Recoil control is perfect, AK spray is laser beam now. Dominating every PvP fight.",
    },
    {
      username: "@apex_predator_ttv",
      verified: true,
      date: "2025-10-19 15:30:45",
      product: "Apex Legends Cheat",
      rating: 5,
      text: "+rep Kiba Apex cheat is insane. Aimbot locks on perfectly, ESP shows everything. Hitting pred rank easy now.",
    },
    {
      username: "@wraith_main_420",
      verified: true,
      date: "2025-10-19 12:15:30",
      product: "Apex Legends Cheat",
      rating: 5,
      text: "Best Apex cheat I've tried. Bone aimbot is smooth, no one suspects. Dropping 20 bombs every game.",
    },
    {
      username: "@battlefield_veteran",
      verified: true,
      date: "2025-10-19 15:40:30",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Kiba Battlefield cheat is incredible. Aimbot with bullet drop compensation is perfect. Sniping is too easy.",
    },
    {
      username: "@recon_scout",
      verified: true,
      date: "2025-10-19 14:30:20",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Kiba Battlefield cheat is undetected and smooth. Minimap radar enhancement is so helpful.",
    },
    {
      username: "@support_gunner",
      verified: true,
      date: "2025-10-19 11:55:45",
      product: "Battlefield Cheat",
      rating: 4,
      text: "Bone aimbot with visibility checks is perfect. Only shoots when clear. Super safe and legit looking.",
    },
    {
      username: "@heli_pilot_ace",
      verified: true,
      date: "2025-10-18 15:10:30",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Vehicle tracking ESP is clutch. Always know where enemy vehicles are. Dominating air and ground.",
    },
    {
      username: "@demolition_expert",
      verified: true,
      date: "2025-10-17 12:40:15",
      product: "Battlefield Cheat",
      rating: 5,
      text: "Stream-proof overlay works great. Streaming with no issues. Best Battlefield cheat 2025.",
    },
    {
      username: "@squad_leader_pro",
      verified: true,
      date: "2025-10-16 10:25:40",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Customizable FOV is great. Set it to look legit and still dominate. Fast delivery and setup.",
    },
    {
      username: "@tank_commander",
      verified: true,
      date: "2025-10-13 14:50:25",
      product: "Battlefield Cheat",
      rating: 5,
      text: "Distance indicators on ESP are perfect. Always know engagement range. This cheat is worth it.",
    },
    {
      username: "@jet_fighter_ace",
      verified: true,
      date: "2025-10-19 13:30:10",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Kiba Battlefield is the best. Regular updates keep it undetected. 24/7 support is amazing.",
    },
    {
      username: "@grenade_launcher",
      verified: true,
      date: "2025-10-18 16:35:50",
      product: "Battlefield Cheat",
      rating: 5,
      text: "Loot detection helps me find the best weapons fast. No recoil makes every gun viable. Highly recommend.",
    },
    {
      username: "@battlefield_legend",
      verified: true,
      date: "2025-10-17 13:15:35",
      product: "Battlefield Cheat",
      rating: 5,
      text: "+rep Best BF cheat on the market. Aimbot is smooth, ESP is detailed. Topping leaderboards every game.",
    },
    {
      username: "@valorant_radiant",
      verified: true,
      date: "2025-10-19 15:50:45",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Kiba Valorant cheat bypasses Vanguard perfectly. Aimbot is smooth, hitting radiant rank easy now.",
    },
    {
      username: "@jett_dasher",
      verified: true,
      date: "2025-10-19 12:35:20",
      product: "Valorant Cheat",
      rating: 5,
      text: "Best Valorant cheat I've tried. Player ESP with ability info is clutch. Always know when enemies have ults.",
    },
    {
      username: "@reyna_fragger",
      verified: true,
      date: "2025-10-18 14:15:35",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Recoil control is perfect. Vandal and Phantom are laser beams. Dropping 30 bombs every game.",
    },
    {
      username: "@sage_healer",
      verified: true,
      date: "2025-10-17 11:45:10",
      product: "Valorant Cheat",
      rating: 4,
      text: "Spike timer ESP is so helpful. Always know when to defuse or rotate. This cheat is game changing.",
    },
    {
      username: "@phoenix_firebird",
      verified: true,
      date: "2025-10-16 16:30:25",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Vanguard bypass works flawlessly. Been using for 2 months, zero bans. Support is amazing.",
    },
    {
      username: "@omen_shadow",
      verified: true,
      date: "2025-10-13 13:55:40",
      product: "Valorant Cheat",
      rating: 5,
      text: "Minimap radar hack is clutch. Always know where enemies are. Best Valorant cheat 2025.",
    },
    {
      username: "@chamber_sniper",
      verified: true,
      date: "2025-10-19 14:40:35",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Kiba Valorant is undetected and smooth. Aimbot FOV is customizable, looks totally legit.",
    },
    {
      username: "@killjoy_tech",
      verified: true,
      date: "2025-10-19 11:20:50",
      product: "Valorant Cheat",
      rating: 5,
      text: "Ability timer tracking is perfect. Always know when to push or hold. This cheat is worth every penny.",
    },
    {
      username: "@cypher_spy",
      verified: true,
      date: "2025-10-18 15:25:15",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Stream-proof overlay works perfectly. Streaming ranked with no issues. Viewers have no clue.",
    },
    {
      username: "@sova_recon",
      verified: true,
      date: "2025-10-17 12:50:30",
      product: "Valorant Cheat",
      rating: 5,
      text: "Player ESP with health info is amazing. Always know when to peek or fall back. Fast delivery and setup.",
    },
    {
      username: "@viper_toxic",
      verified: true,
      date: "2025-10-16 10:35:45",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Kiba Valorant is the best. Spread control is perfect, every shot lands. Super safe and undetected.",
    },
    {
      username: "@breach_flasher",
      verified: true,
      date: "2025-10-13 14:15:20",
      product: "Valorant Cheat",
      rating: 5,
      text: "Skin changer is a nice bonus. Looks cool and works perfectly. Best Valorant cheat on the market.",
    },
    {
      username: "@raze_boomer",
      verified: true,
      date: "2025-10-19 13:45:25",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Aimbot smoothness is adjustable. Set it to look legit and still dominate. Highly recommend Kiba.",
    },
    {
      username: "@skye_aussie",
      verified: true,
      date: "2025-10-18 16:10:40",
      product: "Valorant Cheat",
      rating: 5,
      text: "Regular updates keep it undetected. 24/7 support is great. Best investment for Valorant.",
    },
    {
      username: "@yoru_teleporter",
      verified: true,
      date: "2025-10-17 13:25:10",
      product: "Valorant Cheat",
      rating: 5,
      text: "+rep Kiba Valorant cheat is undetected. Been using for 3 months, zero bans. Hitting immortal rank easy.",
    },
    {
      username: "@cs2_global_elite",
      verified: true,
      date: "2025-10-19 15:15:30",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Kiba CS2 cheat is insane. Aimbot is smooth, ESP is detailed. Hitting global elite easy now.",
    },
    {
      username: "@awp_sniper_god",
      verified: true,
      date: "2025-10-19 12:45:15",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Best CS2 cheat I've used. Bone aimbot is perfect for AWP. Hitting every shot, topping leaderboards.",
    },
    {
      username: "@ak47_spray_master",
      verified: true,
      date: "2025-10-18 14:25:40",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep No recoil and spread control is perfect. AK spray is laser beam. Winning every duel.",
    },
    {
      username: "@entry_fragger_pro",
      verified: true,
      date: "2025-10-17 11:55:25",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Player ESP with health and armor is clutch. Always know when to push. This cheat is game changing.",
    },
    {
      username: "@bhop_king",
      verified: true,
      date: "2025-10-16 16:40:10",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Bunny hop and auto-strafe work perfectly. Movement is so smooth. VAC bypass is flawless.",
    },
    {
      username: "@clutch_master_99",
      verified: true,
      date: "2025-10-13 13:20:35",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Radar hack and sound ESP are amazing. Always know where enemies are. Best CS2 cheat 2025.",
    },
    {
      username: "@deagle_juan_tap",
      verified: true,
      date: "2025-10-19 14:50:20",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Kiba CS2 is undetected and smooth. Aimbot FOV is customizable, looks totally legit.",
    },
    {
      username: "@smoke_criminal",
      verified: true,
      date: "2025-10-19 11:30:45",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Grenade trajectory ESP is perfect. Landing perfect smokes and flashes every time. This cheat is worth it.",
    },
    {
      username: "@pistol_round_ace",
      verified: true,
      date: "2025-10-18 15:35:30",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Stream-proof overlay works great. Streaming faceit with no issues. Viewers have no idea.",
    },
    {
      username: "@site_anchor_ct",
      verified: true,
      date: "2025-10-17 12:15:15",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Weapon ESP helps me find dropped guns fast. Visibility checks work perfectly. Fast delivery and setup.",
    },
    {
      username: "@lurker_sneaky",
      verified: true,
      date: "2025-10-16 10:45:40",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Kiba CS2 is the best. Spread control is perfect, every bullet lands. Super safe and undetected.",
    },
    {
      username: "@igl_strat_caller",
      verified: true,
      date: "2025-10-13 14:25:50",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Skin changer is a nice bonus. Looks cool and works perfectly. Best CS2 cheat on the market.",
    },
    {
      username: "@eco_warrior",
      verified: true,
      date: "2025-10-19 13:55:10",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Aimbot smoothness is adjustable. Set it to look legit and still dominate. Highly recommend Kiba.",
    },
    {
      username: "@flash_assist_king",
      verified: true,
      date: "2025-10-18 16:20:25",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "Regular updates keep it undetected. 24/7 support is great. Best investment for CS2.",
    },
    {
      username: "@retake_specialist",
      verified: true,
      date: "2025-10-17 13:35:45",
      product: "Counter-Strike 2 Cheat",
      rating: 5,
      text: "+rep Kiba CS2 cheat is undetected. Been using for 4 months, zero bans. Hitting faceit level 10 easy.",
    },
    {
      username: "@hwid_master",
      verified: true,
      date: "2025-10-19 15:25:40",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Kiba Permanent Spoofer is the best. One-click operation, works on all games. Never getting banned again.",
    },
    {
      username: "@ban_evader_pro",
      verified: true,
      date: "2025-10-19 12:55:30",
      product: "Permanent Spoofer",
      rating: 5,
      text: "Best spoofer I've used. MAC address changer works perfectly. Got unbanned from 3 games already.",
    },
    {
      username: "@registry_cleaner",
      verified: true,
      date: "2025-10-18 14:35:15",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Registry cleaner is thorough. Removed all traces of bans. This spoofer is game changing.",
    },
    {
      username: "@disk_serial_changer",
      verified: true,
      date: "2025-10-17 11:15:40",
      product: "Permanent Spoofer",
      rating: 5,
      text: "Disk serial modification works flawlessly. Automatic backup system saved me once. Highly recommend.",
    },
    {
      username: "@unban_specialist",
      verified: true,
      date: "2025-10-16 16:50:25",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Permanent solution with lifetime updates. Been using for 6 months, works on every game. Worth it.",
    },
    {
      username: "@anticheat_bypass",
      verified: true,
      date: "2025-10-13 13:30:50",
      product: "Permanent Spoofer",
      rating: 5,
      text: "Anti-cheat bypass technology is incredible. Works on EAC, BattlEye, Vanguard. Best spoofer 2025.",
    },
    {
      username: "@fresh_start_gamer",
      verified: true,
      date: "2025-10-19 14:15:35",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Kiba Permanent Spoofer is undetected. One-click and I'm unbanned. Support is amazing too.",
    },
    {
      username: "@mac_address_pro",
      verified: true,
      date: "2025-10-19 11:40:20",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Compatible with all major games. Tested on 10+ games, works perfectly. This spoofer is worth every penny.",
    },
    {
      username: "@volume_id_changer",
      verified: true,
      date: "2025-10-18 15:45:45",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Regular updates keep it working. Fast delivery and easy setup. Best spoofer on the market.",
    },
    {
      username: "@backup_system_user",
      verified: true,
      date: "2025-10-17 12:25:10",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Automatic backup system is a lifesaver. Restored my system once, worked perfectly. Highly recommend Kiba.",
    },
    {
      username: "@lifetime_updates_fan",
      verified: true,
      date: "2025-10-16 10:55:30",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Lifetime updates are great. Always works with new anti-cheat updates. Best investment ever.",
    },
    {
      username: "@clean_slate_gamer",
      verified: true,
      date: "2025-10-13 14:35:15",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Registry modifier is thorough. Removed all ban traces. Got back into my favorite games. Thank you Kiba!",
    },
    {
      username: "@secure_boot_disabled",
      verified: true,
      date: "2025-10-19 13:10:40",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Easy to use, works perfectly. Setup guide is clear. Best permanent spoofer available.",
    },
    {
      username: "@usb_backup_ready",
      verified: true,
      date: "2025-10-18 16:30:25",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep USB backup feature is smart. Always have a restore point. 24/7 support helped me with setup.",
    },
    {
      username: "@permanent_solution",
      verified: true,
      date: "2025-10-17 13:45:50",
      product: "Permanent Spoofer",
      rating: 5,
      text: "+rep Kiba Permanent Spoofer is undetected. Been using for 8 months, works on every game. Highly recommend.",
    },
    {
      username: "@temp_spoof_master",
      verified: true,
      date: "2025-10-19 15:35:25",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Kiba Temp Spoofer is perfect for testing. Quick activation, no permanent changes. Works great.",
    },
    {
      username: "@quick_unban_pro",
      verified: true,
      date: "2025-10-19 12:15:45",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Best temp spoofer for short-term use. MAC address masking works perfectly. Got unbanned in minutes.",
    },
    {
      username: "@volume_id_temp",
      verified: true,
      date: "2025-10-18 14:45:30",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Volume ID modification is smooth. Automatic cleanup after use is great. No traces left behind.",
    },
    {
      username: "@simple_ui_fan",
      verified: true,
      date: "2025-10-17 11:25:15",
      product: "Temp Spoofer",
      rating: 4,
      text: "+rep Simple user interface makes it easy to use. Perfect for beginners. Support helped me set it up fast.",
    },
    {
      username: "@testing_cheats",
      verified: true,
      date: "2025-10-16 16:15:40",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Perfect for testing cheats. No permanent system changes means I can revert anytime. Highly recommend.",
    },
    {
      username: "@anticheat_compatible",
      verified: true,
      date: "2025-10-13 13:40:25",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Compatible with all major anti-cheats. Tested on EAC, BattlEye, Vanguard. Works on all of them.",
    },
    {
      username: "@quick_activation",
      verified: true,
      date: "2025-10-19 14:25:50",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Quick activation and deactivation is so convenient. Use it when I need it, turn it off when I don't.",
    },
    {
      username: "@mac_masking_pro",
      verified: true,
      date: "2025-10-19 11:50:35",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep MAC address temporary masking works perfectly. No permanent changes to my system. This is great.",
    },
    {
      username: "@cleanup_automatic",
      verified: true,
      date: "2025-10-18 15:15:20",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Automatic cleanup after use is amazing. No traces left behind. 24/7 support is helpful too.",
    },
    {
      username: "@short_term_user",
      verified: true,
      date: "2025-10-17 12:35:45",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Perfect for short-term use. Tested it for a week, worked flawlessly. Will buy again when needed.",
    },
    {
      username: "@no_permanent_changes",
      verified: true,
      date: "2025-10-16 10:20:10",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep No permanent system changes is the best feature. Can revert anytime. Best temp spoofer 2025.",
    },
    {
      username: "@trial_tester",
      verified: true,
      date: "2025-10-13 14:45:35",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Great for testing before committing to permanent. Worked perfectly for 3 days. Highly recommend.",
    },
    {
      username: "@fast_delivery_fan",
      verified: true,
      date: "2025-10-19 13:20:15",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Fast delivery and easy setup. Got it working in 5 minutes. Best temp spoofer on the market.",
    },
    {
      username: "@live_support_helped",
      verified: true,
      date: "2025-10-18 16:40:50",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep 24/7 live support helped me with setup. Very responsive and helpful. This spoofer works great.",
    },
    {
      username: "@temporary_solution",
      verified: true,
      date: "2025-10-17 13:15:25",
      product: "Temp Spoofer",
      rating: 5,
      text: "+rep Kiba Temp Spoofer is undetected. Perfect temporary solution. Will upgrade to permanent soon.",
    },
  ]

  // Calculate stats
  const totalReviews = reviews.length
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((r) => {
    ratingCounts[r.rating - 1]++
  })
  const fiveStarCount = ratingCounts[4]
  const fourStarCount = ratingCounts[3]
  const threeStarCount = ratingCounts[2]
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
  const satisfactionPercent = Math.round(((fiveStarCount + fourStarCount) / totalReviews) * 100)

  const filteredReviews = useMemo(() => {
    let result = [...reviews]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (r) => r.username.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
      )
    }

    if (ratingFilter !== null) {
      result = result.filter((r) => r.rating === ratingFilter)
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortBy === "highest") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "lowest") {
      result.sort((a, b) => a.rating - b.rating)
    }

    return result
  }, [searchQuery, ratingFilter, sortBy])

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 py-16 pt-24 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Verified Customer Reviews
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            {"What Our"}<br />
            <span className="text-green-400">{"Customers Say"}</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-6">
            Real feedback from real customers. See why thousands trust our products.
          </p>
          <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base font-semibold rounded-full gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Write a Review
              <span className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </span>
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">{averageRating}</div>
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "fill-zinc-700 text-zinc-700"}`} />
              ))}
            </div>
            <p className="text-xs text-zinc-500 font-medium">Average Rating</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalReviews}</div>
            <p className="text-xs text-zinc-500 font-medium">Total Reviews</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{satisfactionPercent}%</div>
            <p className="text-xs text-zinc-500 font-medium">Satisfaction</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{fiveStarCount}</div>
            <p className="text-xs text-zinc-500 font-medium">5-Star Reviews</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Rating Distribution
          </h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star - 1]
              const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white w-4">{star}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <div className="flex-1 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-zinc-400 w-8 text-right">{count}</span>
                  <span className="text-sm text-zinc-500 w-10 text-right">{percent}%</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Search, Filter & Sort */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-1 w-full md:w-auto">
              <label className="text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                Search Reviews
              </label>
              <Input
                placeholder="Search by username or review text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            {/* Filter by Rating */}
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter by Rating
              </label>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={ratingFilter === null ? "default" : "outline"}
                  onClick={() => setRatingFilter(null)}
                  className={ratingFilter === null ? "bg-green-600 hover:bg-green-700 text-white" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
                >
                  All
                </Button>
                {[5, 4, 3, 2, 1].map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={ratingFilter === r ? "default" : "outline"}
                    onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
                    className={ratingFilter === r ? "bg-green-600 hover:bg-green-700 text-white" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
                  >
                    {r}<Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-0.5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Review count */}
        <p className="text-sm text-zinc-400 mb-4">
          Showing <span className="font-bold text-white">{filteredReviews.length}</span> of <span className="font-bold text-white">{totalReviews}</span> reviews
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-all duration-300 hover:border-white/40 hover:shadow-lg hover:shadow-white/5 relative group"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-white/20 text-4xl font-serif leading-none select-none">
                {"\"\""}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-zinc-700 text-zinc-700" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-4 pr-6">
                {'"'}{review.text}{'"'}
              </p>

              {/* User */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center text-sm font-bold text-black">
                  {review.username.charAt(1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-white truncate">{review.username}</p>
                    {review.verified && (
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">{review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">No reviews match your search criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">KIBACHEATS</h3>
              <p className="text-sm text-zinc-400">Providing high-quality gaming enhancement software since 2018.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                  Home
                </Link>
                <Link href="/products" className="block text-sm text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                  Products
                </Link>
                <Link href="/status" className="block text-sm text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                  Status
                </Link>
                <Link href="/reviews" className="block text-sm text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                  Reviews
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>support@kibacheats.com</p>
                <p>Join our Discord for faster support</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
            <p>© 2025 KIBA CHEATS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
