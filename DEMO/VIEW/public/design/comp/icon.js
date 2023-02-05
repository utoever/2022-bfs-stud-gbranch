import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div style="margin:30px;line-height:130%;">
        <a href="memLogin.htm" target="_blank">memLogin.htm</a><br>
        <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_blank">https://fonts.google.com/icons?icon.set=Material+Icons</a><br><br>
        <span style="font-family:Consolas;">&lt;span class=&quot;material-symbols-rounded"&gt;<strong style="font-weight:bold;">iconName</strong>&lt;/span&gt;</span>
      </div>
      <div v-for="chapter in iconList" style="margin:30px;">
        <div class="iconDiv">{{chapter.title}} ({{chapter.list.split(' ').length}})</div>
        <div v-for="(icon,n) in chapter.list.split(' ').sort()" class="iconBox" @click="copyName($event)">
          <span class="material-symbols-rounded icon">{{icon}}</span><br>
          <input class="iconName" @click.stop="copyName($event,true)" :value="icon">
        </div>
      </div>
`;

export default {
  template:htmlTemplete,
  data: ()=> { return {
    //https://fonts.google.com/icons?icon.set=Material+Icons
    iconList:[
      {
        title: "UI actions",
        list: "search home menu close settings expand_more done check_circle favorite add delete arrow_back star chevron_right logout arrow_forward_ios add_circle cancel arrow_back_ios file_download arrow_forward arrow_drop_down more_vert check check_box toggle_on grade open_in_new check_box_outline_blank refresh login chevron_left expand_less radio_button_unchecked more_horiz arrow_right_alt apps radio_button_checked file_upload download remove toggle_off bolt arrow_upward filter_list delete_forever autorenew key sort arrow_downward add_box sync arrow_back_ios_new block restart_alt menu_open shopping_cart_checkout expand_circle_down backspace arrow_circle_right undo done_all arrow_right do_not_disturb_on double_arrow open_in_full manage_search sync_alt zoom_in done_outline drag_indicator fullscreen keyboard_double_arrow_right star_half settings_accessibility arrow_drop_up ios_share reply exit_to_app unfold_more library_add cached select_check_box terminal disabled_by_default change_circle swap_horiz swap_vert arrow_circle_left download_for_offline app_registration arrow_circle_up close_fullscreen file_open minimize keyboard_double_arrow_left open_with keyboard_double_arrow_down dataset add_task start create_new_folder keyboard_voice forward settings_applications downloading arrow_left zoom_out compare_arrows redo publish html token switch_access_shortcut arrow_circle_down fullscreen_exit sort_by_alpha delete_sweep indeterminate_check_box first_page keyboard_double_arrow_up view_timeline arrow_drop_down_circle settings_backup_restore assistant_navigation clear_all sync_problem density_medium filter_alt_off last_page heart_plus subdirectory_arrow_right expand download_done unfold_less arrow_outward swipe_left 123 saved_search place_item system_update_alt auto_mode maximize javascript search_off select_all swipe_up output fit_screen dynamic_form hide_source swipe_right switch_access_shortcut_add css browse_gallery density_small assistant_direction file_download_done youtube_searched_for move_up check_small swap_horizontal_circle data_thresholding install_mobile move_down restore_from_trash dataset_linked abc enable install_desktop keyboard_command_key view_kanban reply_all switch_left browse_activity compress swipe_down swap_vertical_circle remove_done filter_list_off apps_outage switch_right hide swipe_vertical pinch more_up keyboard_control_key sync_disabled eject key_off php subdirectory_arrow_left star_rate view_cozy send_time_extension do_not_disturb_off width_normal transcribe view_comfy_alt heart_minus width_full share_reviews view_compact_alt unfold_more_double file_download_off extension_off open_in_new_off vpn_key_off more_down check_indeterminate_small width_wide repartition swipe_left_alt density_large swipe_down_alt swipe_right_alt swipe_up_alt unfold_less_double keyboard_option_key hls hls_off file_upload_off cycle rebase rebase_edit empty_dashboard magnification_large magnification_small"
      },
      {
        title: "Social",
        list: "person group share thumb_up groups person_add public support_agent handshake face sentiment_satisfied rocket_launch group_add workspace_premium psychology person_filled water_drop eco emoji_objects pets travel_explore diversity_3 mood sunny quiz health_and_safety sentiment_dissatisfied sentiment_very_satisfied military_tech recycling thumb_down gavel diamond monitor_heart emoji_people vaccines workspaces diversity_1 compost forest waving_hand recommend person_remove wc medication group_work sentiment_very_dissatisfied sentiment_neutral diversity_2 front_hand man cruelty_free medical_information coronavirus rocket psychology_alt add_reaction female potted_plant emoji_nature rainy person_off woman male connect_without_contact cookie mood_bad solar_power bedtime thunderstorm communication groups_2 partly_cloudy_day cloudy thumbs_up_down masks emoji_flags hive heart_broken sentiment_extremely_dissatisfied clear_day boy whatshot emoji_food_beverage emoji_transportation wind_power elderly face_6 vpn_lock reduce_capacity sick pregnant_woman bloodtype group_remove medication_liquid egg face_3 co2 weight groups_3 follow_the_signs skull transgender oil_barrel elderly_woman face_4 clean_hands sanitizer bring_your_own_ip person_2 cloudy_filled social_distance public_off sign_language south_america sunny_snowing face_2 emoji_symbols routine garden_cart flood egg_alt face_5 cyclone girl person_4 dentistry tsunami outdoor_garden group_off partly_cloudy_night snowing severe_cold person_3 tornado vaping_rooms landslide foggy safety_divider woman_2 no_adult_content volcano man_2 18_up_rating blind 6_ft_apart vape_free not_accessible man_4 radiology rib_cage bedtime_off hand_bones rheumatology man_3 orthopedics tibia skeleton humerus agender femur tibia_alt femur_alt foot_bones humerus_alt ulna_radius ulna_radius_alt specific_gravity diversity_4 breastfeeding"
      },
      {
        title: "Common actions",
        list: "account_circle info visibility calendar_month schedule help language lock warning error visibility_off verified manage_accounts task_alt history event bookmark calendar_today tips_and_updates question_mark fingerprint lightbulb category update lock_open priority_high code date_range build upload_file supervisor_account event_available ads_click today settings_suggest touch_app preview pending stars account_box new_releases celebration how_to_reg alarm push_pin edit_calendar bug_report edit_square label event_note extension rate_review hourglass_empty web record_voice_over published_with_changes support notification_important help_center upload bookmarks accessibility_new pan_tool_alt supervised_user_circle collections_bookmark interests dangerous all_inclusive rule change_history priority event_upcoming build_circle pan_tool wysiwyg circle_notifications hotel_class api manage_history accessible web_asset upgrade lock_reset bookmark_add input event_busy flutter_dash more_time save_as backup accessibility dynamic_feed alarm_on pageview model_training perm_contact_calendar label_important history_toggle_off square_foot more swipe approval component_exchange event_repeat assistant bookmark_added app_shortcut open_in_browser unpublished offline_bolt notification_add free_cancellation no_accounts background_replace anchor running_with_errors 3d_rotation hourglass_full lock_person new_label lock_clock auto_delete accessible_forward add_alert domain_verification smart_button outbound settings_power tab hand_gesture chrome_reader_mode online_prediction edit_notifications generating_tokens gesture find_replace lightbulb_circle backup_table wifi_protected_setup offline_pin ad_units http bookmark_remove alarm_add pinch_zoom_out on_device_training snooze code_off batch_prediction pinch_zoom_in commit hourglass_disabled settings_overscan voice_over_off person_add_disabled alarm_off time_auto timer_10_alt_1 update_disabled rounded_corner all_out label_off timer_3_alt_1 tab_unselected rsvp web_asset_off pin_invoke pin_end code_blocks approval_delegation"
      },
      {
        title: "Communication",
        list: "mail call notifications send chat link forum inventory_2 phone_in_talk contact_support chat_bubble notifications_active alternate_email sms comment power_settings_new hub person_search import_contacts contact_mail contacts live_help forward_to_inbox mark_email_unread lan contact_phone mode_comment reviews hourglass_top inbox drafts outgoing_mail hourglass_bottom mark_email_read sms_failed link_off calendar_add_on phone_enabled add_comment speaker_notes perm_phone_msg co_present topic call_end notifications_off cell_tower mark_chat_unread schedule_send dialpad call_made mark_unread_chat_alt unarchive satellite_alt 3p cancel_presentation mark_as_unread move_to_inbox attach_email phonelink_ring next_plan unsubscribe phone_callback call_received settings_phone call_split present_to_all add_call markunread_mailbox all_inbox voice_chat phone_forwarded mail_lock voicemail attribution duo contact_emergency mark_chat_read upcoming outbox swap_calls spoke phone_disabled phonelink_lock cancel_schedule_send ring_volume notifications_paused quickreply picture_in_picture_alt comment_bank send_and_archive phone_missed settings_bluetooth chat_add_on phonelink_erase picture_in_picture comments_disabled video_chat pause_presentation score speaker_phone speaker_notes_off auto_read_play cell_wifi mms play_for_work call_merge call_missed_outgoing wifi_channel call_missed calendar_apps_script phone_paused rtt auto_read_pause phone_locked wifi_calling dialer_sip chat_apps_script nat sip phone_bluetooth_speaker e911_avatar inbox_customize"
      },
      {
        title: "Photo & Image",
        list: "edit photo_camera filter_alt image navigate_next tune timer picture_as_pdf circle palette add_a_photo auto_awesome photo_library magic_button navigate_before auto_stories add_photo_alternate brush imagesmode nature flash_on wb_sunny camera straighten looks_one landscape timelapse slideshow grid_on rotate_right crop_square style adjust crop_free aspect_ratio brightness_6 photo nature_people filter_vintage crop image_search blur_on movie_filter center_focus_strong contrast face_retouching_natural rotate_left looks_two compare colorize flare wb_incandescent filter_none filter_drama healing looks_3 brightness_5 wb_twilight invert_colors lens opacity incomplete_circle animation broken_image filter_center_focus add_to_photos flip brightness_4 flash_off center_focus_weak auto_awesome_motion lens_blur mic_external_on details no_photography flip_camera_android grain panorama image_not_supported web_stories dehaze flaky loupe exposure_plus_1 gif_box settings_brightness auto_awesome_mosaic texture looks_4 filter_1 timer_off flip_camera_ios camera_enhance panorama_fish_eye view_compact filter brightness_1 control_point_duplicate photo_album photo_camera_front brightness_7 view_comfy linked_camera crop_16_9 transform hide_image looks looks_5 exposure rotate_90_degrees_ccw brightness_3 photo_filter filter_hdr gif leak_add crop_7_5 hdr_strong gradient vrpano blur_circular crop_portrait hdr_auto camera_roll rotate_90_degrees_cw motion_photos_auto brightness_2 photo_size_select_small looks_6 shutter_speed camera_front flash_auto crop_landscape filter_2 filter_tilt_shift monochrome_photos deblur hdr_weak crop_5_4 filter_4 motion_photos_paused astrophotography_auto crop_3_2 filter_3 crop_rotate night_sight_auto tonality switch_camera photo_frame exposure_zero photo_size_select_large party_mode filter_frames fluorescent ev_shadow exposure_plus_2 motion_blur blur_linear exposure_neg_1 photo_camera_back wb_iridescent filter_b_and_w panorama_horizontal motion_photos_off switch_video blur_medium filter_5 invert_colors_off filter_7 raw_on burst_mode panorama_photosphere face_retouching_off grid_off hdr_on filter_9_plus blur_short filter_8 filter_9 dirty_lens timer_10 wb_shade no_flash trail_length image_aspect_ratio filter_6 exposure_neg_2 vignette timer_3 60fps_select leak_remove 30fps_select blur_off mic_external_off perm_camera_mic panorama_vertical trail_length_medium trail_length_short autofps_select camera_rear night_sight_auto_off panorama_wide_angle mp hdr_enhanced_select 24mp hdr_on_select hdr_off 22mp auto_fix_high 10mp 18mp 12mp astrophotography_off wb_auto 9mp hdr_auto_select hdr_plus 13mp 15mp raw_off hdr_off_select 20mp 7mp 19mp auto_fix_normal 14mp 16mp hevc 5mp 6mp 8mp 11mp 23mp 2mp 3mp 21mp 17mp 4mp auto_fix auto_fix_off motion_mode"
      },
      {
        title: "Business & Payments",
        list: "shopping_cart payments shopping_bag monitoring credit_card receipt_long attach_money storefront sell trending_up account_balance database work paid account_balance_wallet analytics insights query_stats store savings monetization_on calculate qr_code_scanner bar_chart add_shopping_cart receipt account_tree redeem currency_exchange trending_flat shopping_basket qr_code_2 domain qr_code leaderboard precision_manufacturing corporate_fare currency_rupee timeline insert_chart euro wallet show_chart work_history credit_score meeting_room barcode_scanner pie_chart loyalty copyright barcode conversion_path track_changes auto_graph euro_symbol price_check trending_down add_business schema add_card card_membership currency_bitcoin price_change production_quantity_limits donut_large tenancy data_exploration donut_small bubble_chart money contactless stacked_line_chart toll stacked_bar_chart money_off cases currency_yen currency_pound area_chart remove_shopping_cart room_preferences add_chart shop card_travel domain_add grouped_bar_chart legend_toggle scatter_plot credit_card_off ssid_chart mediation candlestick_chart currency_ruble waterfall_chart full_stacked_bar_chart domain_disabled shop_two next_week strikethrough_s atm multiline_chart currency_lira currency_yuan no_meeting_room currency_franc autopay contactless_off"
      },
      {
        title: "Maps",
        list: "pin_drop location_on map home_pin explore restaurant flag my_location local_fire_department person_pin_circle local_mall near_me where_to_vote business_center east restaurant_menu handyman factory local_library medical_services home_work layers local_activity share_location north_east emergency add_location fastfood warehouse person_pin navigation local_parking home_repair_service south local_hospital local_police zoom_out_map local_florist location_searching location_away west crisis_alert local_gas_station maps_ugc park cleaning_services local_atm package 360 electrical_services north add_location_alt flag_circle fmd_bad theater_comedy directions local_drink local_pizza local_post_office wine_bar location_home not_listed_location beenhere local_convenience_store signpost location_automation tour alt_route church trip_origin traffic local_laundry_service ev_station takeout_dining safety_check moving zoom_in_map soup_kitchen stadium transfer_within_a_station location_off connecting_airports edit_location multiple_stop wrong_location pest_control plumbing mode_of_travel minor_crash south_east add_road local_pharmacy fire_truck dry_cleaning castle set_meal baby_changing_station layers_clear mosque edit_location_alt north_west local_car_wash edit_attributes run_circle transit_enterexit satellite sos edit_road south_west add_home kebab_dining streetview airline_stops fire_hydrant local_see assist_walker add_home_work flight_class no_meals remove_road synagogue fort temple_buddhist location_disabled compass_calibration temple_hindu explore_off pest_control_rodent near_me_disabled directions_alt pergola directions_off directions_alt_off"
      },
      {
        title: "Text Formatting",
        list: "description content_copy dashboard edit_note menu_book grid_view list folder list_alt inventory folder_open article fact_check attach_file format_list_bulleted assignment task checklist cloud_upload draft summarize feed draw cloud newspaper view_list file_copy note_add border_color book history_edu design_services pending_actions format_quote post_add request_quote cloud_download drag_handle contact_page table space_dashboard archive content_paste percent attachment assignment_ind format_list_numbered assignment_turned_in tag table_chart sticky_note_2 dashboard_customize reorder integration_instructions text_fields format_bold find_in_page note text_snippet document_scanner checklist_rtl note_alt cloud_sync edit_document table_rows perm_media title cloud_done table_view content_cut notes cut subject data_object functions format_italic content_paste_search format_color_fill plagiarism folder_shared horizontal_rule file_present folder_copy format_align_left ballot team_dashboard format_paint add_link read_more difference view_column view_agenda cloud_off format_size format_underlined vertical_align_top toc height vertical_align_bottom copy_all view_week format_color_text view_module assignment_late assignment_return format_align_center low_priority folder_special segment calendar_view_month polyline folder_zip square format_align_right breaking_news_alt_1 grading view_headline view_quilt edit_off linear_scale view_carousel request_page text_increase pages view_sidebar text_format format_align_justify calendar_view_week hexagon numbers docs_add_on folder_delete format_shapes forms_add_on imagesearch_roller calendar_view_day join_full video_file cloud_queue format_list_numbered_rtl font_download content_paste_go restore_page join_inner rectangle format_color_reset rule_folder vertical_split view_stream cloud_circle format_indent_increase spellcheck assignment_returned data_array align_horizontal_left text_decrease pivot_table_chart deselect vertical_align_center space_bar view_day flip_to_front format_strikethrough merge_type pentagon border_all join_left short_text shape_line format_line_spacing line_weight horizontal_split format_indent_decrease align_horizontal_center join_right subtitles_off snippet_folder align_vertical_bottom folder_off align_horizontal_right glyphs format_clear insert_page_break content_paste_off vertical_distribute superscript line_axis horizontal_distribute line_style flip_to_back function align_vertical_center align_vertical_top margin clarify subscript view_array wrap_text border_style border_clear border_outer type_specimen text_rotate_vertical padding amp_stories forms_apps_script border_vertical text_rotation_none format_textdirection_l_to_r format_overline docs_apps_script border_horizontal font_download_off format_textdirection_r_to_l border_bottom text_rotation_angleup border_top border_left text_rotation_down border_inner text_rotation_angledown text_rotate_up border_right format_h1 assignment_add format_underlined_squiggle finance_chip format_h2 format_paragraph format_image_left format_list_bulleted_add format_h3 format_h5 view_column_2 format_h6 format_image_right join format_h4 location_chip voting_chip process_chart variables business_chip attach_file_add"
      },
      {
        title: "Audio & Video",
        list: "play_arrow play_circle mic videocam volume_up pause music_note library_books movie skip_next speed replay volume_off view_in_ar pause_circle fiber_manual_record skip_previous stop_circle stop equalizer subscriptions video_library fast_forward playlist_add video_call repeat volume_mute shuffle mic_off library_music playlist_add_check podcasts hearing fast_rewind queue_music sound_detection_dog_barking video_camera_front subtitles album play_pause volume_down radio av_timer discover_tune library_add_check videocam_off closed_caption stream forward_10 replay_circle_filled not_started playlist_play replay_10 fiber_new branding_watermark recent_actors playlist_remove text_to_speech interpreter_mode slow_motion_video frame_person playlist_add_check_circle settings_voice video_settings featured_play_list audio_file lyrics sound_detection_loud_sound play_lesson hd repeat_one call_to_action add_to_queue music_off video_camera_back high_quality spatial_audio_off shuffle_on playlist_add_circle hearing_disabled volume_down_alt featured_video replay_5 repeat_on queue_play_next art_track airplay spatial_audio explicit forward_5 4k music_video forward_30 speech_to_text replay_30 spatial_tracking control_camera closed_caption_disabled digital_out_of_home video_label fiber_smart_record repeat_one_on play_disabled sd broadcast_on_personal missed_video_call surround_sound 10k remove_from_queue sound_detection_glass_break 60fps fiber_pin broadcast_on_home fiber_dvr 4k_plus 30fps video_stable 8k 1k privacy 2k 8k_plus 1k_plus 7k 9k 9k_plus 5k 2k_plus 5k_plus 6k 6k_plus 3k 7k_plus 3k_plus cinematic_blur auto_detect_voice media_link movie_edit"
      },
      {
        title: "Transportation",
        list: "local_shipping directions_car flight directions_run directions_walk flight_takeoff directions_bus directions_bike train airport_shuttle pedal_bike directions_boat two_wheeler agriculture local_taxi sailing electric_car flight_land hail no_crash commute motorcycle car_crash tram departure_board subway electric_moped turn_right electric_scooter fork_right directions_subway tire_repair electric_bike rv_hookup bus_alert turn_left transportation airlines taxi_alert u_turn_left electric_rickshaw directions_railway turn_slight_right fork_left u_turn_right railway_alert bike_scooter turn_slight_left turn_sharp_right no_transfer snowmobile turn_sharp_left"
      },
      {
        title: "Activities",
        list: "school campaign construction engineering volunteer_activism science sports_esports confirmation_number real_estate_agent cake sports_soccer self_improvement air biotech water hiking architecture personal_injury sports_score sports_basketball waves theaters sports_tennis switch_account nights_stay sports_gymnastics sports_motorsports backpack sports_kabaddi surfing piano how_to_vote sports toys sports_volleyball sports_martial_arts sports_baseball camping kayaking downhill_skiing swords scoreboard phishing sports_handball sports_football skateboarding sports_golf sports_cricket toys_fan nordic_walking roller_skating kitesurfing rowing scuba_diving sports_mma storm paragliding sports_hockey snowboarding ice_skating snowshoeing sports_rugby sledding piano_off no_backpack cake_add"
      },
      {
        title: "Hardware",
        list: "phone_iphone save smartphone print keyboard_arrow_down computer devices desktop_windows smart_display dns keyboard_backspace headphones smart_toy keyboard_arrow_right phone_android memory live_tv keyboard headset_mic laptop_mac keyboard_arrow_up tv device_thermostat mouse balance route point_of_sale keyboard_arrow_left keyboard_return laptop_chromebook power laptop_windows router developer_board display_settings book_online scale watch fax developer_mode cast cast_for_education videogame_asset device_hub straight screen_search_desktop desktop_mac settings_ethernet settings_input_antenna mobile_friendly monitor important_devices tablet_mac settings_remote send_to_mobile system_update monitor_weight devices_other screen_rotation screen_share settings_input_component keyboard_alt speaker power_off keyboard_tab sim_card vibration remember_me merge screenshot_monitor connected_tv browser_updated security_update_good tablet sd_card device_unknown cast_connected charging_station punch_clock tablet_android phonelink_setup scanner settings_input_hdmi screenshot stay_current_portrait print_disabled tap_and_play keyboard_hide security_update_warning disc_full keyboard_capslock app_blocking speaker_group mobile_screen_share aod tty sd_card_alert lift_to_talk add_to_home_screen earbuds stop_screen_share perm_device_information headset_off reset_tv mobile_off desktop_access_disabled offline_share adf_scanner headphones_battery roundabout_right settings_input_svideo screen_lock_portrait settop_component watch_off dock smart_screen stay_current_landscape settings_cell earbuds_battery power_input no_sim screen_lock_landscape chromecast_device home_max roundabout_left stay_primary_portrait developer_board_off tv_off stay_primary_landscape ramp_right home_mini phonelink_off ramp_left screen_lock_rotation videogame_asset_off aod_tablet"
      },
      {
        title: "Android",
        list: "dark_mode light_mode wifi signal_cellular_alt password widgets pin rss_feed storage battery_full wifi_off bluetooth dvr battery_charging_full thermostat graphic_eq nightlight battery_5_bar signal_wifi_4_bar gpp_maybe cable gpp_bad data_usage battery_4_bar battery_full_alt signal_cellular_4_bar airplanemode_active radar cameraswitch battery_0_bar wallpaper signal_disconnected flashlight_on network_check battery_6_bar charger wifi_tethering sim_card_download usb splitscreen battery_3_bar battery_1_bar network_wifi_3_bar adb battery_low battery_alert bluetooth_searching network_wifi bluetooth_connected battery_2_bar brightness_high 5g network_cell nfc data_saver_on pattern bluetooth_disabled signal_wifi_statusbar_not_connected noise_control_off signal_wifi_bad network_wifi_2_bar signal_cellular_3_bar mode_standby signal_wifi_off network_wifi_1_bar brightness_low brightness_medium battery_very_low mobiledata_off grid_4x4 signal_wifi_0_bar battery_charging_20 battery_charging_80 battery_saver flashlight_off battery_charging_90 signal_wifi_statusbar_null settings_system_daydream battery_unknown battery_charging_50 signal_cellular_2_bar screen_rotation_alt badge_critical_battery wifi_calling_3 4g_mobiledata signal_cellular_1_bar noise_aware nearby_error battery_charging_60 wifi_lock do_not_disturb_on_total_silence battery_20 signal_cellular_connected_no_internet_0_bar signal_cellular_0_bar network_ping edgesensor_high wifi_tethering_error wifi_2_bar battery_charging_30 brightness_auto airplanemode_inactive wifi_calling_1 battery_50 grid_3x3 battery_30 lte_mobiledata signal_cellular_alt_2_bar perm_data_setting signal_cellular_connected_no_internet_4_bar 1x_mobiledata battery_60 bluetooth_drive 4g_plus_mobiledata perm_scan_wifi wifi_calling_2 battery_90 media_bluetooth_on signal_cellular_nodata signal_cellular_off battery_80 network_locked timer_10_select signal_cellular_alt_1_bar wifi_tethering_off edgesensor_low devices_fold usb_off wifi_1_bar apk_install signal_cellular_null lte_plus_mobiledata 3g_mobiledata g_mobiledata grid_goldenratio portable_wifi_off media_bluetooth_off noise_control_on timer_3_select e_mobiledata apk_document h_mobiledata r_mobiledata nearby_off h_plus_mobiledata"
      },
      {
        title: "Privacy & Security",
        list: "badge verified_user admin_panel_settings report security vpn_key shield policy exclamation privacy_tip assured_workload disabled_visible e911_emergency enhanced_encryption private_connectivity add_moderator sync_lock no_encryption wifi_password key_visualizer remove_moderator report_off"
      },
      {
        title: "Travel",
        list: "apartment location_city fitness_center lunch_dining spa cottage local_cafe hotel family_restroom beach_access local_bar other_houses pool luggage liquor airplane_ticket casino sports_bar bakery_dining ramen_dining nightlife local_dining holiday_village icecream escalator_warning dinner_dining museum food_bank night_shelter festival attractions golf_course stairs villa smoke_free smoking_rooms car_rental airline_seat_recline_normal elevator gite child_friendly airline_seat_recline_extra breakfast_dining car_repair cabin carpenter brunch_dining no_food houseboat do_not_touch rice_bowl tapas wheelchair_pickup bento no_drinks do_not_step airline_seat_flat bungalow airline_seat_individual_suite escalator chalet no_luggage airline_seat_legroom_extra airline_seat_flat_angled airline_seat_legroom_reduced airline_seat_legroom_normal no_stroller"
      },
      {
        title: "Household",
        list: "house bed ac_unit chair coffee electric_bolt sensors child_care checkroom back_hand grass emergency_home shower mode_fan kitchen mop room_service styler thermometer yard bathtub king_bed roofing energy_savings_leaf window cooking valve garage_home door_front light garage foundation outdoor_grill table_restaurant dining deck weekend coffee_maker sensor_occupied flatware humidity_high fireplace mode_night highlight electric_meter humidity_low humidity_mid tv_gen bedroom_parent chair_alt blender microwave oven_gen scene single_bed heat_pump bedroom_baby bathroom in_home_mode mode_off_on hot_tub hardware sprinkler table_bar gas_meter crib soap countertops living mode_cool propane_tank fire_extinguisher home_iot_device remote_gen sensor_door outlet event_seat gate faucet airware dishwasher_gen balcony energy_program_saving wash air_freshener water_damage camera_indoor bedroom_child house_siding microwave_gen switch door_sliding detector_smoke iron energy_program_time_used water_heater desk umbrella dresser door_back doorbell mode_fan_off fence hvac camera_outdoor kettle air_purifier_gen emergency_heat stroller emergency_share curtains multicooker sensors_off shield_moon mode_heat_cool thermostat_auto smart_outlet emergency_recording controller_gen blinds roller_shades dry blinds_closed roller_shades_closed propane sensor_window thermostat_carbon range_hood blanket doorbell_3p tv_with_assistant vertical_shades_closed mode_heat_off vertical_shades curtains_closed mode_cool_off tamper_detection_off"
      },
      {
        title: "Home",
        list: "stadia_controller temp_preferences_custom door_open power_rounded nest_eco_leaf nest_clock_farsight_analog device_reset nest_remote_comfort_sensor laundry battery_horiz_075 shield_with_heart temp_preferences_eco familiar_face_and_zone tools_power_drill airwave productivity battery_horiz_050 nest_heat_link_gen_3 weather_snowy activity_zone ev_charger cleaning_bucket settings_alert nest_remote nest_display arrows_more_up nest_cam_indoor nest_heat_link_e nest_multi_room home_storage nest_secure_alarm battery_horiz_000 light_group nest_thermostat_gen_3 nest_cam_outdoor detection_and_zone mfg_nest_yale_lock tools_pliers_wire_stripper nest_cam_iq_outdoor tools_ladder floor_lamp detector_alarm early_on nest_cam_iq nest_clock_farsight_digital auto_schedule auto_activity_zone home_speaker nest_mini house_with_shield nest_hello_doorbell home_max_dots zone_person_urgent cool_to_dry nest_audio nest_wifi_router nest_farsight_weather shield_with_house motion_sensor_active nest_display_max window_closed heat_pump_balance nest_found_savings arming_countdown chromecast_2 battery_vert_050 battery_profile window_open detector_status self_care arrows_more_down nest_true_radiant tools_level nest_thermostat_zirconium_eu climate_mini_split zone_person_alert nest_cam_wired_stand nest_detect detector quiet_time nest_wifi_point nest_doorbell_visitor tools_installation_kit battery_vert_020 nest_thermostat_sensor_eu nest_tag nest_wifi_mistral door_sensor nest_connect tools_phillips nest_thermostat_sensor nest_sunblock battery_vert_005 nest_wifi_point_vento nest_cam_floodlight nest_thermostat_e_eu nest_wifi_gale doorbell_chime detector_battery detector_co nest_wake_on_approach tools_flat_head nest_wake_on_press motion_sensor_alert motion_sensor_urgent nest_cam_magnet_mount tamper_detection_on window_sensor zone_person_idle quiet_time_active table_lamp nest_cam_stand detector_offline wall_lamp nest_cam_wall_mount nest_locator_tag motion_sensor_idle"
      },
      {
        title: "Brand",
        list: "translate drive_file_rename_outline android g_translate home_app_logo cloudy_snowing view_in_ar_new tools_wrench webhook drive_folder_upload clear_night drive_file_move mode_heat atr error_circle_rounded quick_phrases add_to_drive wifi_find polymer logo_dev drive_file_move_outline youtube_activity matter drive_file_move_rtl macro_off google_wifi thumb_up_off google_plus_reshare"
      },
      /*{
          title: "Others",
          list: "thumb_up_off google_plus_reshare thumb_down_off phone_in_talk_watchface_indicator star_rate_half"
      }*/
    ]
  }},

  methods:{
    copyName(ev,src){
      //console.log(ev);
      const el=ev.srcElement;
      let iconName=el.outerText.trim();
      if(!iconName) iconName=el._value.trim();

      if(!src){
        iconName='<span class="material-symbols-rounded">'+iconName+'</span>';
        navigator.clipboard.writeText(iconName);//클립보드에 복사
        //alert('"'+iconName+'" source copied.');
      }
      else{
        navigator.clipboard.writeText(iconName);//클립보드에 복사
        //alert('"'+iconName+'" name copied.');
      }
    }
  },

  mounted(){
  }
};