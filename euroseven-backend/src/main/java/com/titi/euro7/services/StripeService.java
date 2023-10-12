package com.titi.euro7.services;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    static {
        // Initialize Stripe's API key
        Stripe.apiKey = "sk_test_51NawL5H9VQbrAIWcqIZY0VMpwhGA6nR89bw6mLEtql5eoaTYDv2E3KuHtgEEUzryTdci60IQ4sHiA64zcruHMNeX00Ogah8E0f";
    }

    public String createCheckoutSession(double amount, String nrFactura) {

        long stripePrice = Math.round(amount * 100); // Convert to cents

        String YOUR_DOMAIN = "http://localhost:3000/client/home";
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(YOUR_DOMAIN + "?success=true")
                        .setCancelUrl(YOUR_DOMAIN + "?canceled=true")
                        .setLocale(SessionCreateParams.Locale.RO)
                        .setAutomaticTax(
                                SessionCreateParams.AutomaticTax.builder()
                                        .setEnabled(true)
                                        .build())
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(stripePrice)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Plată Factură EURO7")
                                                                        .setDescription("Plată Factură Nr. " + nrFactura)
                                                                        .build()
                                                        )
                                                        .build()).build()
                        )
                        .build();

        try {
            Session session = Session.create(params);
            return session.getUrl();
        } catch (Exception e) {
            throw new RuntimeException("Error creating Stripe session", e);
        }
    }
}