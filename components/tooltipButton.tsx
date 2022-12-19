import React, { useState } from 'react';
import styles from '../styles/tooltipButton.module.css';
import ChatBotComponent from './chatbot';
import Image from 'next/image';


export default function TooltipButton() {
    return (
        <div className={styles.bottom}>
            <label htmlFor="trigger">
                <span className={styles.balloon}>
                    Chat
                </span>
            </label>
            <div className={styles.popup_wrap}>
                <input id="trigger" type="checkbox" />
                <div className={styles.popup_overlay}>
                    <label htmlFor="trigger" className={styles.popup_trigger}></label>
                    <div className={styles.popup_content}>
                        <label htmlFor="trigger" className={styles.close_btn}></label>
                        <ChatBotComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}
