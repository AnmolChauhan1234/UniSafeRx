# blockchain/utils/blockchain.py
import json
import os
from web3 import Web3
from django.conf import settings

# Web3 provider (e.g., Ganache)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

# Load ABI and address
with open(os.path.join(settings.BASE_DIR, 'blockchain', 'build', 'Contract.json')) as f:
    contract_data = json.load(f)

contract = w3.eth.contract(
    address=contract_data['address'],
    abi=contract_data['abi']
)

account = w3.eth.accounts[0]  # Default account

def register_medicine(key: str, hash_hex: str):
    tx = contract.functions.register(key, Web3.toBytes(hexstr=hash_hex)).build_transaction({
        'from': account,
        'gas': 100000,
        'nonce': w3.eth.get_transaction_count(account)
    })
    signed = w3.eth.account.sign_transaction(tx, private_key=settings.GANACHE_PRIVATE_KEY)
    w3.eth.send_raw_transaction(signed.rawTransaction)

def get_medicine_hash(key: str) -> str:
    return Web3.toHex(contract.functions.getHash(key).call())
