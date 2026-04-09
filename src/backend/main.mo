import LyricTypes "types/lyrics";
import MusicTypes "types/music";
import LyricsMixin "mixins/lyrics-api";
import MusicMixin "mixins/music-api";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import List "mo:core/List";
import Runtime "mo:core/Runtime";



actor {
  // ── Lyrics state ────────────────────────────────────────────────────────────
  let lyrics    = List.empty<LyricTypes.LyricEntry>();
  let lyricsId  = { var val : Nat = 0 };

  // ── Music store state ────────────────────────────────────────────────────────
  let tracks       = List.empty<MusicTypes.TrackEntry>();
  let musicId      = { var val : Nat = 0 };
  let purchases    = List.empty<MusicTypes.PurchaseRecord>();
  let stripeConfig = { var val : ?Stripe.StripeConfiguration = null };

  // ── Object storage (file upload/download infrastructure) ─────────────────────
  include MixinObjectStorage();

  // ── Mixins ───────────────────────────────────────────────────────────────────
  include LyricsMixin(lyrics, lyricsId);
  include MusicMixin(tracks, musicId, purchases, stripeConfig);

  // ── Stripe (required top-level functions) ────────────────────────────────────

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig.val) {
      case null Runtime.trap("Stripe is not configured");
      case (?c) c;
    };
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig.val != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    stripeConfig.val := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
