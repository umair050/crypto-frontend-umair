import os
from flask import Blueprint, jsonify, request
import stripe
from stripe.error import SignatureVerificationError

from apps import db
from apps.home.models import User

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
endpoint_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

blueprint = Blueprint('payment', __name__)

@blueprint.route('/webhook', methods=['POST'])
def webhook():
    payload = request.data
    sig_header = request.headers.get('STRIPE_SIGNATURE')

    # Debugging outputs
    # print(f"Payload: {payload}")  # Check if payload is None
    # print(f"Signature Header: {sig_header}")  # Check if the signature header is None

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        print(f"Received event: {event['type']}")  # Debug output
    except ValueError as e:
        print(f"ValueError: {str(e)}")  # Debug output
        return jsonify({'error': 'Invalid payload'}), 400
    except SignatureVerificationError as e:
        print(f"SignatureVerificationError: {str(e)}")  # Debug output
        return jsonify({'error': 'Invalid signature'}), 400
    except Exception as e:
        print(f"Unhandled exception during event construction: {str(e)}")
        return jsonify({'error': 'An error occurred'}), 500


    print("Event construction", event['type'])
    # Handle subscription events
    if event['type'] == 'customer.subscription.created':
        subscription = event['data']['object']
        handle_subscription_created(subscription)
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        handle_subscription_updated(subscription)
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        handle_subscription_canceled(subscription)
    else:
        print(f"Unhandled event type: {event['type']}")

    return jsonify(success=True)

def handle_subscription_created(subscription):
    if subscription.get('id'):
        user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
        if user:
            user.subscription_status = 'active'
            db.session.commit()
        else:
            print(f"User not found for subscription ID: {subscription['id']}")
    else:
        print("Subscription ID is missing.")

def handle_subscription_updated(subscription):
    if subscription.get('id'):
        user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
        if user:
            user.subscription_status = 'active' if subscription['status'] == 'active' else 'past_due'
            db.session.commit()
        else:
            print(f"User not found for subscription ID: {subscription['id']}")
    else:
        print("Subscription ID is missing.")

def handle_subscription_canceled(subscription):
    if subscription.get('id'):
        user = User.query.filter_by(stripe_subscription_id=subscription['id']).first()
        if user:
            user.subscription_status = 'canceled'
            db.session.commit()
        else:
            print(f"User not found for subscription ID: {subscription['id']}")
    else:
        print("Subscription ID is missing.")
